/**
 * engine.js - Core Mathematical Negotiation Engine
 * Encapsulates the pricing models, patience system, callback probability,
 * and EAFC-style transfer market grading calculations.
 */

export class NegotiationEngine {
  constructor(item, seller, dripPreset = null) {
    this.item = item;
    this.seller = seller;
    this.dripPreset = dripPreset;

    const mult = dripPreset?.stats?.quoteMultiplier || 1.0;
    this.openingPrice = Math.round((item.askingPrice * mult) / 500) * 500;
    this.currentSellerPrice = this.openingPrice;
    this.floorPrice = item.floorPrice;
    this.marketFairPrice = item.marketFairPrice;

    let basePatience = seller.basePatience || 100;
    if (dripPreset?.stats?.basePatienceMod) {
      basePatience += dripPreset.stats.basePatienceMod; // e.g. Corporate lunch rush (-15)
    }
    // Market Soldier Disadvantage: On high-ticket Certified Original items, seller is skeptical of player's funds
    if (dripPreset?.id === "market_soldier" && item.isOriginal && item.askingPrice >= 35000) {
      basePatience -= 15;
    }
    this.patience = Math.max(25, Math.min(100, basePatience));
    this.patienceShield = dripPreset?.stats?.patienceShield || 1.0;
    this.rounds = 0;
    this.history = [];
    this.status = "negotiating"; // 'negotiating' | 'agreed' | 'lost' | 'walked_away'
    this.agreedPrice = null;
    this.lastPlayerOffer = null;
    this.canAttemptCallback = true;
    this.usedSpecialMoves = new Set();
    this.chaosTriggered = false;
  }

  /**
   * Helper to format currency in Nigerian Naira
   */
  static formatNaira(amount) {
    return "₦" + Math.round(amount).toLocaleString();
  }

  /**
   * Parses flexible player input strings like '10k', '10.5k', '10,000', '1.2m', '10000'
   */
  static parseAmount(input) {
    if (typeof input === "number") return isNaN(input) || input <= 0 ? null : Math.round(input);
    if (!input) return null;
    let str = String(input).trim().toLowerCase();

    // Strip currency symbols, commas, spaces
    str = str.replace(/[₦$#,\s]/g, "");
    if (!str) return null;

    if (str.endsWith("k")) {
      const num = parseFloat(str.slice(0, -1));
      return isNaN(num) || num <= 0 ? null : Math.round(num * 1000);
    }

    if (str.endsWith("m")) {
      const num = parseFloat(str.slice(0, -1));
      return isNaN(num) || num <= 0 ? null : Math.round(num * 1000000);
    }

    const num = parseFloat(str);
    return isNaN(num) || num <= 0 ? null : Math.round(num);
  }

  /**
   * Processes a player's counter-offer
   * @param {number} offer - The player's proposed price
   * @returns {Object} result - Details of the seller's reaction
   */
  submitOffer(offer) {
    if (this.status !== "negotiating") {
      return { error: "Negotiation is already concluded." };
    }

    offer = Math.round(Number(offer));
    if (isNaN(offer) || offer <= 0) {
      return { error: "Please enter a valid amount." };
    }

    this.rounds++;
    this.lastPlayerOffer = offer;

    // Record player offer in history
    this.history.push({
      speaker: "player",
      price: offer,
      text: `How about ${NegotiationEngine.formatNaira(offer)}?`
    });

    // 1. Instant Accept if player offers >= current asking price
    if (offer >= this.currentSellerPrice) {
      this.status = "agreed";
      this.agreedPrice = this.currentSellerPrice;
      const text = this._pickDialogue("acceptedDeal");
      this.history.push({
        speaker: "seller",
        price: this.agreedPrice,
        text,
        type: "accept"
      });
      return {
        action: "agreed",
        text,
        sellerPrice: this.agreedPrice,
        patience: this.patience
      };
    }

    const floorRatio = offer / this.floorPrice;
    const insultThreshold = this.seller.insultToleranceRatio || 0.65;

    // 2. Insult Zone (Audacious Lowball)
    if (floorRatio < insultThreshold) {
      let rawDeduction = 32 + Math.floor(Math.random() * 8);
      // Student Advantage: Lowball forgiveness (sellers chuckle at broke student allowance)
      if (this.dripPreset?.id === "student") {
        rawDeduction = Math.round(rawDeduction * 0.55);
      }
      // IJGB Disadvantage: Offended that wealthy diaspora buyer with AirPods is lowballing aggressively
      if (this.dripPreset?.id === "ijgb") {
        rawDeduction = Math.round(rawDeduction * 1.45);
      }

      const patienceDeduction = Math.round(rawDeduction / this.patienceShield);
      this.patience = Math.max(0, this.patience - patienceDeduction);

      // Only give a negligible discount or none at all
      const smallDrop = Math.round((this.currentSellerPrice - this.floorPrice) * 0.03);
      this.currentSellerPrice = Math.max(this.floorPrice, this.currentSellerPrice - smallDrop);

      const text = this._pickDialogue("insults");

      if (this.patience <= 0) {
        this.status = "lost";
        const kickedText = this._pickDialogue("outOfPatience");
        this.history.push({
          speaker: "seller",
          price: this.currentSellerPrice,
          text: kickedText,
          type: "lost"
        });
        return { action: "lost", text: kickedText, patience: 0 };
      }

      this.history.push({
        speaker: "seller",
        price: this.currentSellerPrice,
        text,
        type: "insult"
      });
      return {
        action: "insult",
        text,
        sellerPrice: this.currentSellerPrice,
        patience: this.patience
      };
    }

    // 3. Close to Floor or Fair Deal Zone
    // If the offer is above or around 1.08x the floor price, the seller might close the deal!
    const acceptableRatio = 1.08;
    if (floorRatio >= acceptableRatio) {
      // Chance of seller accepting outright increases as offer approaches current asking price
      const acceptChance = 0.4 + (offer - this.floorPrice) / (this.currentSellerPrice - this.floorPrice);
      if (Math.random() < acceptChance || this.rounds >= 4) {
        this.status = "agreed";
        this.agreedPrice = offer;
        const text = this._pickDialogue("acceptedDeal");
        this.history.push({
          speaker: "seller",
          price: this.agreedPrice,
          text,
          type: "accept"
        });
        return {
          action: "agreed",
          text,
          sellerPrice: this.agreedPrice,
          patience: this.patience
        };
      }
    }

    // 4. Normal Counter-Offer (Negotiation Concession)
    const rawCost = this.seller.patienceLossPerOffer || 12;
    const patienceCost = Math.round(rawCost / this.patienceShield);
    this.patience = Math.max(0, this.patience - patienceCost);

    if (this.patience <= 0) {
      this.status = "lost";
      const kickedText = this._pickDialogue("outOfPatience");
      this.history.push({
        speaker: "seller",
        price: this.currentSellerPrice,
        text: kickedText,
        type: "lost"
      });
      return { action: "lost", text: kickedText, patience: 0 };
    }

    // Calculate seller concession step (between 25% and 45% towards floor/offer)
    const margin = this.currentSellerPrice - this.floorPrice;
    let concessionFactor = 0.28 + Math.random() * 0.18;
    // Corporate Advantage: Lunch-hour rush forces +15% faster concessions from seller
    if (this.dripPreset?.stats?.concessionBonus) {
      concessionFactor += this.dripPreset.stats.concessionBonus;
    }
    const dropAmount = Math.max(500, Math.round(margin * concessionFactor));
    
    // Counter cannot go below the floor price
    this.currentSellerPrice = Math.max(
      Math.round(this.floorPrice * 1.05),
      this.currentSellerPrice - dropAmount
    );

    const pool = floorRatio >= 0.9 ? "softenedCounter" : "grumblingCounter";
    let text = this._pickDialogue(pool);
    text = text.replace("{counter}", NegotiationEngine.formatNaira(this.currentSellerPrice));

    this.history.push({
      speaker: "seller",
      price: this.currentSellerPrice,
      text,
      type: "counter"
    });

    return {
      action: "counter",
      text,
      sellerPrice: this.currentSellerPrice,
      patience: this.patience
    };
  }

  /**
   * Player accepts the seller's current price directly
   */
  acceptCurrentPrice() {
    if (this.status !== "negotiating") {
      return { error: "Negotiation is already concluded." };
    }

    this.status = "agreed";
    this.agreedPrice = this.currentSellerPrice;
    const text = this._pickDialogue("acceptedDeal");
    this.history.push({
      speaker: "seller",
      price: this.agreedPrice,
      text,
      type: "accept"
    });
    return {
      action: "agreed",
      text,
      sellerPrice: this.agreedPrice,
      patience: this.patience
    };
  }

  /**
   * The famous Lagos "Walk Away" move!
   * The seller might chase you and drop their price dramatically.
   */
  walkAway() {
    if (this.status !== "negotiating") {
      return { error: "Negotiation is already concluded." };
    }

    // If patience is completely trashed or no offer made, they let you leave
    const reasonableLastOffer = this.lastPlayerOffer && this.lastPlayerOffer >= this.floorPrice * 0.72;
    const callbackChance = this.dripPreset?.stats?.callbackChance !== undefined
      ? this.dripPreset.stats.callbackChance
      : (this.seller.callbackChance || 0.75);
    const minPatienceRequired = this.dripPreset?.id === "ijgb" ? 10 : 20;

    const shouldCallback =
      this.canAttemptCallback &&
      this.patience >= minPatienceRequired &&
      reasonableLastOffer &&
      Math.random() <= callbackChance;

    if (shouldCallback) {
      this.canAttemptCallback = false; // Only one dramatic callback per transaction
      
      // Seller gives their near-rock-bottom concession
      const floorTarget = Math.round(this.floorPrice * (1.04 + Math.random() * 0.08));
      this.currentSellerPrice = Math.min(
        this.currentSellerPrice - 500,
        Math.max(floorTarget, Math.round((this.currentSellerPrice + (this.lastPlayerOffer || this.floorPrice)) / 2))
      );

      let text = this._pickDialogue("walkAwayCallback");
      if (this.dripPreset?.id === "ijgb") {
        text = `Chai! Oga London! Brother wait now! No waka go! Settle for {counter} make we close deal!`;
      }
      text = text.replace("{counter}", NegotiationEngine.formatNaira(this.currentSellerPrice));

      this.history.push({
        speaker: "seller",
        price: this.currentSellerPrice,
        text,
        type: "callback"
      });

      return {
        action: "callback",
        calledBack: true,
        text,
        sellerPrice: this.currentSellerPrice,
        patience: this.patience
      };
    } else {
      this.status = "walked_away";
      let text = this._pickDialogue("walkAwayLost");
      if (this.dripPreset?.id === "student") {
        text = `Eyah, student pocket don dry. Go back to campus my pikin, market no be for you today.`;
      }
      this.history.push({
        speaker: "seller",
        price: this.currentSellerPrice,
        text,
        type: "lost"
      });
      return {
        action: "walked_away",
        calledBack: false,
        text,
        patience: this.patience
      };
    }
  }

  /**
   * Evaluates if a random Lagos Market Chaos event should occur this round
   */
  checkRandomChaos() {
    if (!this.chaosTriggered && this.rounds >= 2 && Math.random() < 0.45) {
      this.chaosTriggered = true;
      const roll = Math.random();

      if (roll < 0.35) {
        // Event 1: Competing Buyer
        const rivalBid = Math.min(
          this.currentSellerPrice - 500,
          Math.max(this.floorPrice, Math.round((this.currentSellerPrice * 0.88) / 500) * 500)
        );
        return {
          type: "competing_buyer",
          title: "Competing Customer Intrusion!",
          description: `Another eager buyer pushes through the crowd with cash: "Oga Bros! I get ${NegotiationEngine.formatNaira(rivalBid)} cash right now make I carry am!"`,
          rivalBid
        };
      } else if (roll < 0.70) {
        // Event 2: Sudden Rainstorm
        const rainDiscountPrice = Math.max(
          Math.round(this.floorPrice * 1.05),
          Math.round((this.currentSellerPrice * 0.82) / 500) * 500
        );
        return {
          type: "rain_rush",
          title: "Sudden Lagos Rainstorm!",
          description: `Heavy thunder claps! Dark rain clouds take over the sky. Sellers are hastily covering clothes with nylon tarps! The seller yells: "Rain wan destroy my goods! Pay ${NegotiationEngine.formatNaira(rainDiscountPrice)} now now make I pack up!"`,
          discountPrice: rainDiscountPrice
        };
      } else {
        // Event 3: Agbero / Area Boy Salute
        let toll = this.dripPreset?.stats?.agberoToll || 500;
        let desc = `A muscular area boy with tinted shades strolls past the stall: "Chairman! Boys dey loyal o! Weekend pure water money for the boys!"`;
        if (this.dripPreset?.id === "ijgb") {
          desc = `A muscular area boy spots your clean sneakers and AirPods: "Chairman London! Fresh blood don land! Pure water money for the boys na ₦1,500 today!"`;
        } else if (this.dripPreset?.id === "market_soldier") {
          desc = `An area boy gives you a street fist-bump: "Ah! Egbon street soldier! Drop small ₦200 pure water money make boys hail you!"`;
        } else if (this.dripPreset?.id === "student") {
          desc = `An area boy smirks: "Student boy! Drop ₦200 for boys or show your school ID card!"`;
        } else if (this.dripPreset?.id === "corporate") {
          desc = `Area boys surround the stall: "Island Banker! Happy Friday! Drop ₦800 for the boys!"`;
        }
        return {
          type: "agbero_salute",
          title: "Area Boy / Agbero Salute!",
          description: desc,
          tipAmount: toll
        };
      }
    }
    return null;
  }

  /**
   * Executes a tactical street dialogue banter move
   * @param {string} moveId - 'sweet_talk' | 'fault_find' | 'fake_call' | 'show_cash'
   */
  useSpecialMove(moveId) {
    if (this.status !== "negotiating") {
      return { error: "Negotiation is already concluded." };
    }
    if (this.usedSpecialMoves.has(moveId)) {
      return { error: "You already used this special tactic at this stall!" };
    }
    this.usedSpecialMoves.add(moveId);

    if (moveId === "sweet_talk") {
      const gain = this.dripPreset?.stats?.sweetTalkGain || 22;
      this.patience = Math.min(100, this.patience + gain);
      let text = "Chairman! You get sweet mouth die! You understand street respect!";
      if (this.dripPreset?.id === "student") {
        text = this.seller.name.includes("Mama")
          ? "Aww, my handsome student son! I know say life hard for campus, take am easy!"
          : "Student boy! Your sweet mouth don save you! I don cool down!";
      } else if (this.dripPreset?.id === "ijgb") {
        text = "Bros, which kind phoneh / foreign accent be this? Speak proper street Pidgin jare! But no wahala!";
      } else if (this.seller.name.includes("Mama")) {
        text = "Aww, my handsome child! You have home training. You talk like my own brother!";
      }
      return {
        action: "sweet_talk",
        patience: this.patience,
        text,
        gain
      };
    }

    if (moveId === "fault_find") {
      // CONSEQUENCE: If the item is genuine original, seller gets deeply insulted and RAISES the price!
      if (this.item.isOriginal) {
        const priceHike = Math.max(1500, Math.round((this.currentSellerPrice * 0.14) / 500) * 500);
        this.currentSellerPrice += priceHike;
        const patienceLoss = Math.round(25 / this.patienceShield);
        this.patience = Math.max(0, this.patience - patienceLoss);

        let insultQuote = `God forbid! You dey find fault inside genuine original ${this.item.name}?! Because you disrespect my quality, the price don climb to ${NegotiationEngine.formatNaira(this.currentSellerPrice)}! Buy am or waka pass!`;
        if (this.seller.name.includes("Mama")) {
          insultQuote = `Tufiakwa! You are looking for dirty stain on genuine original ${this.item.name}?! Because you insulted my market, the price is now ${NegotiationEngine.formatNaira(this.currentSellerPrice)}! Pay or leave my stall!`;
        } else if (this.seller.name.includes("Chidi")) {
          insultQuote = `Guy, you dey doubt Factory Unlocked Apple device with True Tone?! Because you disrespect original IMEI, the price na ${NegotiationEngine.formatNaira(this.currentSellerPrice)} now!`;
        } else if (this.seller.name.includes("Danladi")) {
          insultQuote = `Subhanallah! Sweet Grade-1 crop from Abuja you say get rot?! The price don rise to ${NegotiationEngine.formatNaira(this.currentSellerPrice)}!`;
        } else if (this.seller.name.includes("Chief")) {
          insultQuote = `Look this boy o! Pure copper coil generator you dey tap with finger?! The price don enter ${NegotiationEngine.formatNaira(this.currentSellerPrice)}! If you no get money, go buy candle!`;
        }

        return {
          action: "fault_find",
          isBackfire: true,
          success: false,
          sellerPrice: this.currentSellerPrice,
          patience: this.patience,
          text: insultQuote
        };
      }

      // If replica/thrift: fault inspection catches them and drops price!
      const success = Math.random() < 0.85;
      if (success) {
        const drop = Math.round((this.currentSellerPrice - this.floorPrice) * 0.30);
        this.currentSellerPrice = Math.max(Math.round(this.floorPrice * 1.05), this.currentSellerPrice - drop);
        return {
          action: "fault_find",
          isBackfire: false,
          success: true,
          sellerPrice: this.currentSellerPrice,
          patience: this.patience,
          text: `Ah ah, small loose thread or label na him you spot? Oya no wahala, I drop am to ${NegotiationEngine.formatNaira(this.currentSellerPrice)}.`
        };
      } else {
        this.patience = Math.max(0, this.patience - 12);
        return {
          action: "fault_find",
          isBackfire: false,
          success: false,
          sellerPrice: this.currentSellerPrice,
          patience: this.patience,
          text: "Commot for here! Na high grade work! Which kind bad-eye you get?!"
        };
      }
    }

    if (moveId === "fake_call") {
      let bluffMultiplier = 0.35;
      if (this.dripPreset?.id === "market_soldier") {
        bluffMultiplier = 0.45; // Street veteran bluff is believed 100%
      } else if (this.dripPreset?.id === "student") {
        bluffMultiplier = 0.25; // Student bluff is slightly suspect
      }
      const drop = Math.round((this.currentSellerPrice - this.floorPrice) * bluffMultiplier);
      this.currentSellerPrice = Math.max(Math.round(this.floorPrice * 1.06), this.currentSellerPrice - drop);
      return {
        action: "fake_call",
        sellerPrice: this.currentSellerPrice,
        patience: this.patience,
        text: `Don't enter that crook shop at front! Take am for ${NegotiationEngine.formatNaira(this.currentSellerPrice)} right now!`
      };
    }

    if (moveId === "show_cash") {
      const target = Math.round(this.floorPrice * 1.08);
      let thresholdMultiplier = 1.25;
      let successChance = 0.60;

      // Drip specific modifiers:
      if (this.dripPreset?.id === "ijgb") {
        thresholdMultiplier = 1.45; // IJGB massive cash closing power!
        successChance = 0.95;
      } else if (this.dripPreset?.id === "market_soldier") {
        if (this.item.isOriginal && this.item.askingPrice >= 35000) {
          // Mocked on luxury original items
          thresholdMultiplier = 1.05;
          successChance = 0.25;
        }
      } else if (this.dripPreset?.id === "student") {
        if (this.item.askingPrice >= 20000) {
          thresholdMultiplier = 1.08;
          successChance = 0.30;
        }
      } else if (this.dripPreset?.id === "corporate") {
        thresholdMultiplier = 1.35; // Bank app transfer credibility
        successChance = 0.80;
      }

      if (this.currentSellerPrice <= target * thresholdMultiplier || Math.random() < successChance) {
        this.status = "agreed";
        this.agreedPrice = Math.max(this.floorPrice, target);
        let acceptText = "You hold raw cash? Oya slap am on top table, carry your market go!";
        if (this.dripPreset?.id === "ijgb") {
          acceptText = "Oga London slapped crisp notes on the counter! Seller's eyes lit up: 'Deal closed, Chairman!'";
        } else if (this.dripPreset?.id === "corporate") {
          acceptText = "Instant bank transfer alert beeped! Seller beamed: 'Corporate alert confirmed! Carry am go!'";
        }
        return {
          action: "show_cash",
          agreed: true,
          sellerPrice: this.agreedPrice,
          text: acceptText
        };
      } else {
        this.patience = Math.max(0, this.patience - 10);
        let rejectText = "This small cash no reach my capital! Keep your change for taxi!";
        if (this.dripPreset?.id === "market_soldier" && this.item.isOriginal && this.item.askingPrice >= 35000) {
          rejectText = "Seller sneered at your squeezed ₦200 notes: 'Oga street boy, this dirty change no fit buy original item! Keep am for okada!' (-10% Patience)";
        } else if (this.dripPreset?.id === "student" && this.item.askingPrice >= 20000) {
          rejectText = "Seller laughed: 'Student, put that small feeding allowance back before you buy gala!' (-10% Patience)";
        }
        return {
          action: "show_cash",
          agreed: false,
          sellerPrice: this.currentSellerPrice,
          patience: this.patience,
          text: rejectText
        };
      }
    }

    return { error: "Unknown tactic." };
  }

  /**
   * Computes the EA FC style transfer market rating for the completed deal
   */
  calculateGrade() {
    if (this.status !== "agreed" || this.agreedPrice === null) {
      return null;
    }

    const moneySaved = this.openingPrice - this.agreedPrice;
    const maxPossibleSavings = this.openingPrice - this.floorPrice;
    
    // Efficiency: percentage of seller's fluff margin that you successfully shaved off
    const efficiency = maxPossibleSavings > 0
      ? Math.max(0, Math.min(1, moneySaved / maxPossibleSavings))
      : 0;

    let grade = "F";
    let title = "Pure Mugu / JJC (Journey Just Coming)";
    let badgeColor = "bg-red-600";
    let comment = "You paid opening price without fight. The seller is throwing a thanksgiving party.";

    if (efficiency >= 0.88) {
      grade = "A+";
      title = "Senior Street Veteran / Oga Boss";
      badgeColor = "bg-emerald-500 text-white";
      comment = "Masterclass haggling! You squeezed almost every kobo of profit out of this deal.";
    } else if (efficiency >= 0.74) {
      grade = "A";
      title = "Sharp Lagosian / Master Haggler";
      badgeColor = "bg-green-600 text-white";
      comment = "Impressive street smarts! Seller barely made enough profit to buy cold pure water.";
    } else if (efficiency >= 0.55) {
      grade = "B+";
      title = "Market Wise / Solid Trader";
      badgeColor = "bg-lime-600 text-white";
      comment = "Solid negotiation. Both you and the seller walk away satisfied.";
    } else if (efficiency >= 0.38) {
      grade = "B";
      title = "Average Bargainer";
      badgeColor = "bg-yellow-500 text-stone-900";
      comment = "You tried small, but the seller still smiled to the bank with a healthy cut.";
    } else if (efficiency >= 0.20) {
      grade = "C";
      title = "Ajebutter / Soft Life";
      badgeColor = "bg-orange-500 text-white";
      comment = "You gave up too easily. They could smell your clean sneakers from a mile away.";
    }

    return {
      grade,
      title,
      badgeColor,
      comment,
      openingPrice: this.openingPrice,
      agreedPrice: this.agreedPrice,
      floorPrice: this.floorPrice,
      moneySaved,
      savingsPercent: Math.round((moneySaved / this.openingPrice) * 100),
      efficiencyPercent: Math.round(efficiency * 100),
      rounds: this.rounds,
      remainingPatience: this.patience
    };
  }

  _pickDialogue(category) {
    const lines = this.seller.dialogue[category] || ["No comment."];
    return lines[Math.floor(Math.random() * lines.length)];
  }
}

export class CampaignManager {
  constructor(campaignConfig) {
    this.config = campaignConfig;
    this.initialBudget = campaignConfig.budget;
    this.currentBudget = campaignConfig.budget;
    this.currentStepIndex = 0;
    this.purchases = [];
    this.status = "in_progress"; // 'in_progress' | 'completed' | 'bankrupt'
    this.hasTriggeredHazard = false;
    this.hazardChoice = null;
  }

  getCurrentQuest() {
    if (this.currentStepIndex >= this.config.quests.length) return null;
    return this.config.quests[this.currentStepIndex];
  }

  applyHazardOutcome(option) {
    this.hasTriggeredHazard = true;
    this.hazardChoice = option;
    if (option.cost) {
      // Cost can be positive (spending pocket money) or negative (gaining bonus cash from Mama)
      this.currentBudget -= option.cost;
    }
    return {
      remainingBudget: this.currentBudget,
      effect: option.effect,
      message: option.message
    };
  }

  recordPurchase(quest, item, agreedPrice, evaluation) {
    this.currentBudget -= agreedPrice;

    // Generate Mama's inspection reaction for this item
    let mamaInspection = "";
    if (item.isOriginal) {
      const originalQuotes = [
        `Mama tapped the material with joy: "Chai! 100% genuine original! You have good market eyes like your father!"`,
        `Mama verified the quality: "Original quality! Those market thieves didn't deceive you at all! Proud of you!"`,
        `Mama smiled brightly: "Certified authentic! I will show this off to my church friends tomorrow!"`
      ];
      mamaInspection = originalQuotes[Math.floor(Math.random() * originalQuotes.length)];
    } else {
      const replicaQuotes = [
        `Mama scratched the label suspiciously: "Wait o... you bought high-grade replica for me! Well, at least the price was sweet, but don't let Auntie inspect it!"`,
        `Mama squinted at the item: "Mcheww! This is clever thrift work! But because you saved money, I forgive your sins today!"`,
        `Mama chuckled: "Lagos replica! The design looks sharp though. As long as nobody touches the seam, we dey alright!"`
      ];
      mamaInspection = replicaQuotes[Math.floor(Math.random() * replicaQuotes.length)];
    }

    this.purchases.push({
      quest,
      item,
      price: agreedPrice,
      evaluation,
      mamaInspection
    });

    this.currentStepIndex++;

    if (this.currentBudget < 0) {
      this.status = "bankrupt";
    } else if (this.currentStepIndex >= this.config.quests.length) {
      this.status = "completed";
    }

    return {
      status: this.status,
      remainingBudget: this.currentBudget,
      isFinished: this.currentStepIndex >= this.config.quests.length || this.currentBudget < 0
    };
  }

  evaluateCampaign() {
    const totalSpent = this.initialBudget - this.currentBudget;
    const pocketMoney = Math.max(0, this.currentBudget);
    const verdicts = this.config.verdicts;

    // Helper to calculate threshold supporting both minRatio (dynamic) and minSaved (static)
    const getThreshold = (v) => {
      if (!v) return 0;
      if (typeof v.minRatio === "number") return this.initialBudget * v.minRatio;
      if (typeof v.minSaved === "number") return v.minSaved;
      return 0;
    };

    let verdictObj = verdicts.disowned;
    let badge = "F";
    let badgeColor = "bg-red-600";

    if (this.currentBudget < 0) {
      verdictObj = verdicts.disowned;
      badge = "F";
      badgeColor = "bg-red-600";
    } else if (pocketMoney >= getThreshold(verdicts.legendary)) {
      verdictObj = verdicts.legendary;
      badge = "S";
      badgeColor = "bg-emerald-500 text-white";
    } else if (pocketMoney >= getThreshold(verdicts.sharp)) {
      verdictObj = verdicts.sharp;
      badge = "A";
      badgeColor = "bg-green-600 text-white";
    } else if (pocketMoney >= getThreshold(verdicts.average)) {
      verdictObj = verdicts.average;
      badge = "B";
      badgeColor = "bg-yellow-500 text-stone-900";
    } else if (pocketMoney >= getThreshold(verdicts.ajebutter)) {
      verdictObj = verdicts.ajebutter;
      badge = "C";
      badgeColor = "bg-orange-500 text-white";
    } else {
      verdictObj = verdicts.disowned;
      badge = "F";
      badgeColor = "bg-red-600";
    }

    const quote = verdictObj.quote.replace("{saved}", NegotiationEngine.formatNaira(pocketMoney));

    const originalCount = this.purchases.filter((p) => p.item.isOriginal).length;
    const replicaCount = this.purchases.filter((p) => !p.item.isOriginal).length;

    return {
      initialBudget: this.initialBudget,
      totalSpent,
      pocketMoney,
      badge,
      badgeColor,
      title: verdictObj.title,
      quote,
      purchases: this.purchases,
      originalCount,
      replicaCount,
      isBankrupt: this.currentBudget < 0
    };
  }
}
