/**
 * app.js - Lagos Market Haggling Game Controller
 * Wires the Engine, 2D Sprites, Drip System, Special Moves, Market Chaos, Audio, and DOM interactions.
 */

import { MARKETS, SATURDAY_ERRAND, generateDynamicErrand } from "./data.js";
import { NegotiationEngine, CampaignManager } from "./engine.js";
import { sounds } from "./sound.js";
import { dripManager, DRIP_PRESETS } from "./drip.js";

class HaggleApp {
  constructor() {
    this.mode = "free"; // "free" | "campaign"
    this.campaignDifficulty = "standard";
    this.currentErrandConfig = null;
    this.campaignManager = null;
    this.nextStallPatienceBonus = 0;
    this.currentMarketIndex = 0;
    this.currentItemIndex = 0;
    this.engine = null;
    this.currentTutorialStep = 0;

    this.cacheDom();
    this.bindEvents();
    this.renderMarketTabs();
    this.renderDripPresetsList();
    this.renderCampaignBriefing(this.campaignDifficulty);
    this.startSession();

    // Check for first-time visitor onboarding
    try {
      if (localStorage.getItem("lagos_haggle_tutorial_seen") !== "true") {
        setTimeout(() => {
          this.openTutorial(0);
        }, 500);
      }
    } catch (e) {
      // ignore in sandboxed environments
    }
  }

  cacheDom() {
    // Tutorial Elements
    this.btnOpenTutorial = document.getElementById("btnOpenTutorial");
    this.tutorialModal = document.getElementById("tutorialModal");
    this.btnCloseTutorial = document.getElementById("btnCloseTutorial");
    this.tutTabButtons = document.querySelectorAll(".tut-tab-btn");
    this.tutSlides = document.querySelectorAll(".tut-slide");
    this.tutDots = document.querySelectorAll(".tut-dot");
    this.btnPrevTutSlide = document.getElementById("btnPrevTutSlide");
    this.btnNextTutSlide = document.getElementById("btnNextTutSlide");

    // Mode Buttons & HUD
    this.btnModeFree = document.getElementById("btnModeFree");
    this.btnModeCampaign = document.getElementById("btnModeCampaign");
    this.campaignHud = document.getElementById("campaignHud");
    this.hudBudgetRemaining = document.getElementById("hudBudgetRemaining");
    this.hudCurrentTarget = document.getElementById("hudCurrentTarget");
    this.hudPocketMoney = document.getElementById("hudPocketMoney");
    this.transitToast = document.getElementById("transitToast");
    this.transitToastText = document.getElementById("transitToastText");

    // Drip & Persona
    this.btnOpenDrip = document.getElementById("btnOpenDrip");
    this.currentDripLabel = document.getElementById("currentDripLabel");
    this.dripModal = document.getElementById("dripModal");
    this.dripPresetsList = document.getElementById("dripPresetsList");
    this.btnCloseDrip = document.getElementById("btnCloseDrip");

    // 2D Sprites & Stage
    this.playerSpriteSvg = document.getElementById("playerSpriteSvg");
    this.sellerSpriteSvg = document.getElementById("sellerSpriteSvg");
    this.sellerSpriteLabel = document.getElementById("sellerSpriteLabel");
    this.rainOverlay = document.getElementById("rainOverlay");

    // Market & Navigation
    this.marketSelectorBar = document.getElementById("marketSelectorBar");
    this.btnSoundToggle = document.getElementById("btnSoundToggle");
    this.soundIcon = document.getElementById("soundIcon");
    this.soundText = document.getElementById("soundText");

    // Left Column Info
    this.sellerAvatar = document.getElementById("sellerAvatar");
    this.sellerName = document.getElementById("sellerName");
    this.sellerTitle = document.getElementById("sellerTitle");
    this.patienceBarFill = document.getElementById("patienceBarFill");
    this.patiencePercentText = document.getElementById("patiencePercentText");
    this.itemSelectDropdown = document.getElementById("itemSelectDropdown");
    this.itemIcon = document.getElementById("itemIcon");
    this.itemName = document.getElementById("itemName");
    this.itemDesc = document.getElementById("itemDesc");
    this.askingPriceDisplay = document.getElementById("askingPriceDisplay");
    this.roundsCountDisplay = document.getElementById("roundsCountDisplay");

    // Right Column Arena & Tactics
    this.dialogueContainer = document.getElementById("dialogueContainer");
    this.statusBadge = document.getElementById("statusBadge");
    this.tacticButtons = document.querySelectorAll(".tactic-btn");
    this.offerForm = document.getElementById("offerForm");
    this.offerInput = document.getElementById("offerInput");
    this.offerLivePreview = document.getElementById("offerLivePreview");
    this.quickButtons = document.querySelectorAll(".quick-btn");
    this.btnAcceptCurrent = document.getElementById("btnAcceptCurrent");
    this.btnAcceptPriceText = document.getElementById("btnAcceptPriceText");
    this.btnWalkAway = document.getElementById("btnWalkAway");

    // Modals
    this.gradeModal = document.getElementById("gradeModal");
    this.gradeBadge = document.getElementById("gradeBadge");
    this.gradeTitle = document.getElementById("gradeTitle");
    this.gradeComment = document.getElementById("gradeComment");
    this.statOpening = document.getElementById("statOpening");
    this.statAgreed = document.getElementById("statAgreed");
    this.statFloor = document.getElementById("statFloor");
    this.statSaved = document.getElementById("statSaved");
    this.statRounds = document.getElementById("statRounds");
    this.statPatience = document.getElementById("statPatience");
    this.btnPlayAgain = document.getElementById("btnPlayAgain");

    // Callback Modal
    this.callbackModal = document.getElementById("callbackModal");
    this.callbackQuote = document.getElementById("callbackQuote");
    this.callbackPriceTag = document.getElementById("callbackPriceTag");
    this.btnAcceptCallback = document.getElementById("btnAcceptCallback");
    this.btnRejectCallback = document.getElementById("btnRejectCallback");

    // Loss Modal
    this.lossModal = document.getElementById("lossModal");
    this.lossTitle = document.getElementById("lossTitle");
    this.lossMessage = document.getElementById("lossMessage");
    this.btnLossRetry = document.getElementById("btnLossRetry");

    // Campaign Modals & Elements
    this.campaignIntroModal = document.getElementById("campaignIntroModal");
    this.btnCloseCampaignIntro = document.getElementById("btnCloseCampaignIntro");
    this.btnCancelErrand = document.getElementById("btnCancelErrand");
    this.btnQuitCampaign = document.getElementById("btnQuitCampaign");
    this.campaignIntroTitle = document.getElementById("campaignIntroTitle");
    this.campaignIntroBudgetText = document.getElementById("campaignIntroBudgetText");
    this.campaignIntroDialogue = document.getElementById("campaignIntroDialogue");
    this.campaignIntroQuestList = document.getElementById("campaignIntroQuestList");
    this.diffButtons = document.querySelectorAll(".diff-btn");
    this.btnStartErrand = document.getElementById("btnStartErrand");

    // Road Hazard Modal
    this.roadHazardModal = document.getElementById("roadHazardModal");
    this.hazardIcon = document.getElementById("hazardIcon");
    this.hazardTitle = document.getElementById("hazardTitle");
    this.hazardDesc = document.getElementById("hazardDesc");
    this.hazardOptionsList = document.getElementById("hazardOptionsList");

    // Mama Report Card
    this.mamaReportModal = document.getElementById("mamaReportModal");
    this.mamaBadge = document.getElementById("mamaBadge");
    this.mamaVerdictTitle = document.getElementById("mamaVerdictTitle");
    this.mamaVerdictQuote = document.getElementById("mamaVerdictQuote");
    this.mamaStatInitialBudget = document.getElementById("mamaStatInitialBudget");
    this.mamaStatSpent = document.getElementById("mamaStatSpent");
    this.mamaStatSaved = document.getElementById("mamaStatSaved");
    this.mamaStatAuthenticity = document.getElementById("mamaStatAuthenticity");
    this.mamaReceiptsList = document.getElementById("mamaReceiptsList");
    this.btnMamaRetry = document.getElementById("btnMamaRetry");

    // Chaos Modal
    this.chaosModal = document.getElementById("chaosModal");
    this.chaosIcon = document.getElementById("chaosIcon");
    this.chaosTitle = document.getElementById("chaosTitle");
    this.chaosDescription = document.getElementById("chaosDescription");
    this.chaosActions = document.getElementById("chaosActions");
  }

  bindEvents() {
    // Mode Switchers
    this.btnModeFree.addEventListener("click", () => this.setMode("free"));
    this.btnModeCampaign.addEventListener("click", () => this.setMode("campaign"));

    // Drip Modal
    this.btnOpenDrip.addEventListener("click", () => {
      this.dripModal.classList.add("active");
    });
    this.btnCloseDrip.addEventListener("click", () => {
      this.dripModal.classList.remove("active");
    });

    // Tutorial Event Listeners
    if (this.btnOpenTutorial) {
      this.btnOpenTutorial.addEventListener("click", () => this.openTutorial(0));
    }
    if (this.btnCloseTutorial) {
      this.btnCloseTutorial.addEventListener("click", () => this.closeTutorial());
    }
    if (this.tutorialModal) {
      this.tutorialModal.addEventListener("click", (e) => {
        if (e.target === this.tutorialModal) {
          this.closeTutorial();
        }
      });
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.tutorialModal && this.tutorialModal.classList.contains("active")) {
          this.closeTutorial();
        } else if (this.campaignIntroModal && this.campaignIntroModal.classList.contains("active")) {
          this.setMode("free");
        } else if (this.dripModal && this.dripModal.classList.contains("active")) {
          this.dripModal.classList.remove("active");
        }
      }
    });
    this.tutTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.goToTutorialStep(parseInt(btn.dataset.step, 10));
      });
    });
    this.tutDots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        this.goToTutorialStep(idx);
      });
    });
    if (this.btnPrevTutSlide) {
      this.btnPrevTutSlide.addEventListener("click", () => {
        this.goToTutorialStep(this.currentTutorialStep - 1);
      });
    }
    if (this.btnNextTutSlide) {
      this.btnNextTutSlide.addEventListener("click", () => {
        if (this.currentTutorialStep < this.tutSlides.length - 1) {
          this.goToTutorialStep(this.currentTutorialStep + 1);
        } else {
          this.closeTutorial();
        }
      });
    }

    // Dismiss & Cancel Saturday Errand (Back to Free Mode)
    if (this.btnCloseCampaignIntro) {
      this.btnCloseCampaignIntro.addEventListener("click", () => this.setMode("free"));
    }
    if (this.btnCancelErrand) {
      this.btnCancelErrand.addEventListener("click", () => this.setMode("free"));
    }
    if (this.btnQuitCampaign) {
      this.btnQuitCampaign.addEventListener("click", () => this.setMode("free"));
    }
    if (this.campaignIntroModal) {
      this.campaignIntroModal.addEventListener("click", (e) => {
        if (e.target === this.campaignIntroModal) {
          this.setMode("free");
        }
      });
    }

    // Errand Difficulty Selector
    this.diffButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.diffButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.campaignDifficulty = btn.dataset.diff;
        this.renderCampaignBriefing(this.campaignDifficulty);
      });
    });

    // Campaign Briefing & Final retry
    this.btnStartErrand.addEventListener("click", () => {
      this.campaignIntroModal.classList.remove("active");
      this.startCampaignMission();
    });

    this.btnMamaRetry.addEventListener("click", () => {
      this.mamaReportModal.classList.remove("active");
      this.renderCampaignBriefing(this.campaignDifficulty);
      this.campaignIntroModal.classList.add("active");
    });

    // Sound Toggle
    this.btnSoundToggle.addEventListener("click", () => {
      const isMuted = sounds.toggleMute();
      this.soundIcon.textContent = isMuted ? "🔇" : "🔊";
      this.soundText.textContent = isMuted ? "Sound OFF" : "Sound ON";
    });

    // Item Switcher Dropdown
    this.itemSelectDropdown.addEventListener("change", (e) => {
      this.currentItemIndex = parseInt(e.target.value, 10);
      this.startSession();
    });

    // Live parsing preview as the user types (e.g. "10k" -> "= ₦10,000")
    this.offerInput.addEventListener("input", () => {
      this.updateOfferPreview();
    });

    // Tactical Special Moves Buttons
    this.tacticButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const moveId = btn.dataset.tactic;
        this.handleSpecialMove(moveId, btn);
      });
    });

    // Quick Percentage Offer Buttons
    this.quickButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const factor = parseFloat(btn.dataset.pct);
        const currentPrice = this.engine.currentSellerPrice;
        const computedOffer = Math.round((currentPrice * factor) / 500) * 500;
        this.offerInput.value = computedOffer;
        this.updateOfferPreview();
        this.offerInput.focus();
      });
    });

    // Offer Form Submit with flexible input parsing (10k, 10000, 10,000, etc.)
    this.offerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = this.offerInput.value;
      const parsed = NegotiationEngine.parseAmount(raw);
      if (!parsed || parsed <= 0) {
        alert("Please enter a valid amount (e.g., 10k, 12,000, or 15000).");
        return;
      }
      this.handleOffer(parsed);
      this.offerInput.value = "";
      this.updateOfferPreview();
    });

    // Direct Accept Current Price
    this.btnAcceptCurrent.addEventListener("click", () => {
      const res = this.engine.acceptCurrentPrice();
      sounds.playCoinSound();
      this.appendDialogueBubble("player", `I agree to pay ${NegotiationEngine.formatNaira(res.sellerPrice)}.`);
      this.appendDialogueBubble("seller", res.text);
      this.showEafcGrade();
    });

    // The Walk Away Move
    this.btnWalkAway.addEventListener("click", () => {
      this.handleWalkAway();
    });

    // Callback Modal Buttons
    this.btnAcceptCallback.addEventListener("click", () => {
      this.callbackModal.classList.remove("active");
      const res = this.engine.acceptCurrentPrice();
      sounds.playCoinSound();
      this.appendDialogueBubble("player", `Alright, you got me! I'll take it for ${NegotiationEngine.formatNaira(res.sellerPrice)}.`);
      this.showEafcGrade();
    });

    this.btnRejectCallback.addEventListener("click", () => {
      this.callbackModal.classList.remove("active");
      sounds.playWalkoutSad();
      this.showLossModal("You Walked Away Clean!", "You stood your ground and walked into the crowd. Your money stays in your pocket.");
    });

    // Play Again / Next Errand Button in EAFC Grade Modal
    this.btnPlayAgain.addEventListener("click", () => {
      this.gradeModal.classList.remove("active");
      if (this.mode === "campaign" && this.campaignManager) {
        if (this.campaignManager.isFinished || this.campaignManager.status === "completed" || this.campaignManager.status === "bankrupt") {
          this.showMamaReport();
        } else {
          // Trigger mid-trip Lagos road hazard between stalls (once per errand campaign)
          if (!this.campaignManager.hasTriggeredHazard && this.campaignManager.currentStepIndex >= 1 && this.campaignManager.config.roadHazard) {
            this.showRoadHazardModal(this.campaignManager.config.roadHazard);
          } else {
            this.loadCampaignStep();
          }
        }
      } else {
        const market = MARKETS[this.currentMarketIndex];
        this.currentItemIndex = (this.currentItemIndex + 1) % market.items.length;
        this.itemSelectDropdown.value = this.currentItemIndex;
        this.startSession();
      }
    });

    this.btnLossRetry.addEventListener("click", () => {
      this.lossModal.classList.remove("active");
      this.startSession();
    });
  }

  openTutorial(step = 0) {
    this.goToTutorialStep(step);
    if (this.tutorialModal) {
      sounds.playCounterPop();
      this.tutorialModal.classList.add("active");
    }
  }

  closeTutorial() {
    if (this.tutorialModal) {
      this.tutorialModal.classList.remove("active");
    }
    try {
      localStorage.setItem("lagos_haggle_tutorial_seen", "true");
    } catch (e) {
      // ignore
    }
  }

  goToTutorialStep(stepIndex) {
    if (stepIndex < 0) stepIndex = 0;
    if (stepIndex >= this.tutSlides.length) stepIndex = this.tutSlides.length - 1;
    this.currentTutorialStep = stepIndex;

    this.tutTabButtons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === stepIndex);
    });

    this.tutSlides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === stepIndex);
    });

    this.tutDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === stepIndex);
    });

    if (this.btnPrevTutSlide) {
      this.btnPrevTutSlide.style.visibility = stepIndex === 0 ? "hidden" : "visible";
    }

    if (this.btnNextTutSlide) {
      if (stepIndex === this.tutSlides.length - 1) {
        this.btnNextTutSlide.innerHTML = `<span>Start Haggling!</span> ➔`;
      } else {
        this.btnNextTutSlide.innerHTML = `<span>Next</span> ❯`;
      }
    }
  }

  renderDripPresetsList() {
    this.dripPresetsList.innerHTML = "";
    DRIP_PRESETS.forEach((preset) => {
      const isActive = preset.id === dripManager.currentPreset.id;
      const card = document.createElement("div");
      card.className = `drip-card ${isActive ? "active" : ""}`;
      card.innerHTML = `
        <div class="drip-card-icon">${preset.avatar}</div>
        <div class="drip-info">
          <div class="drip-header-row">
            <h4>${preset.name}</h4>
            ${isActive ? '<span class="drip-active-badge">✓ ACTIVE</span>' : ""}
          </div>
          <p class="drip-tagline">${preset.tagline}</p>
          <div class="drip-pros-cons">
            <div class="drip-pro">
              <span class="pro-badge">🟢 ADVANTAGE</span>
              <span>${preset.advantage}</span>
            </div>
            <div class="drip-con">
              <span class="con-badge">🔴 DISADVANTAGE</span>
              <span>${preset.disadvantage}</span>
            </div>
          </div>
          <div class="drip-stats-chips">
            <span class="drip-stat-chip">🏷️ Quote: ${preset.statsDisplay.quote}</span>
            <span class="drip-stat-chip">⚡ Stamina: ${preset.statsDisplay.patience}</span>
            <span class="drip-stat-chip">🚶 Walkout: ${preset.statsDisplay.callback}</span>
            <span class="drip-stat-chip">💵 Cash Flex: ${preset.statsDisplay.cashPower}</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        dripManager.setPreset(preset.id);
        this.currentDripLabel.textContent = preset.name.split(" ")[0];
        this.renderDripPresetsList();
        this.updateSprites();
        // Restart session with updated drip opening quote
        this.startSession();
      });
      this.dripPresetsList.appendChild(card);
    });
  }

  updateSprites() {
    const market = MARKETS[this.currentMarketIndex];
    this.playerSpriteSvg.innerHTML = dripManager.renderPlayerSvg();
    this.sellerSpriteSvg.innerHTML = dripManager.renderSellerSvg(market.seller.name);
    this.sellerSpriteLabel.textContent = market.seller.name.split(" ")[0].toUpperCase();
  }

  handleSpecialMove(moveId, buttonEl) {
    if (buttonEl.classList.contains("used")) return;

    if (moveId === "sweet_talk") {
      const res = this.engine.useSpecialMove("sweet_talk");
      if (res.error) {
        alert(res.error);
        return;
      }
      buttonEl.classList.add("used");
      sounds.playSweetTalk();
      this.appendDialogueBubble("player", "Chairman/Mama! Your face dey shine today! God go bless your market well well!", "bubble-player");
      this.appendDialogueBubble("seller", res.text, "bubble-callback");
      this.updatePatienceUI();
    } else if (moveId === "fault_find") {
      const res = this.engine.useSpecialMove("fault_find");
      if (res.error) {
        alert(res.error);
        return;
      }
      buttonEl.classList.add("used");
      this.appendDialogueBubble("player", "Wait o, inspect this seam/edge well well. You sure say this material complete?", "bubble-player");

      if (res.isBackfire) {
        sounds.playInsultBuzz();
        this.appendDialogueBubble("seller", res.text, "bubble-insult");
        // Consequence: Asking price increased! Flash red!
        this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
        this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
        this.askingPriceDisplay.style.color = "#ef4444";
        setTimeout(() => {
          this.askingPriceDisplay.style.color = "#f59e0b";
        }, 1800);
      } else if (res.success) {
        sounds.playCounterPop();
        this.appendDialogueBubble("seller", res.text);
        this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
        this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      } else {
        sounds.playInsultBuzz();
        this.appendDialogueBubble("seller", res.text, "bubble-insult");
      }
      this.updatePatienceUI();
    } else if (moveId === "fake_call") {
      const res = this.engine.useSpecialMove("fake_call");
      if (res.error) {
        alert(res.error);
        return;
      }
      buttonEl.classList.add("used");
      sounds.playPhoneRing();
      this.appendDialogueBubble("player", "*(Puts phone to ear)* Hello? Broda, you say the shop for front dey sell this exact one cheaper? Okay I dey come...", "bubble-player");
      setTimeout(() => {
        sounds.playCounterPop();
        this.appendDialogueBubble("seller", res.text, "bubble-callback");
        this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
        this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      }, 700);
    } else if (moveId === "show_cash") {
      const res = this.engine.useSpecialMove("show_cash");
      if (res.error) {
        alert(res.error);
        return;
      }
      buttonEl.classList.add("used");
      sounds.playCashSlap();
      this.appendDialogueBubble("player", "*(Slaps Naira cash notes on the stall table)* See raw cash in my hand. Take am now now or I waka!", "bubble-player");

      if (res.agreed) {
        sounds.playCoinSound();
        this.appendDialogueBubble("seller", res.text, "bubble-callback");
        this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
        this.showEafcGrade();
      } else {
        sounds.playInsultBuzz();
        this.appendDialogueBubble("seller", res.text, "bubble-insult");
        this.updatePatienceUI();
      }
    }
  }

  triggerChaosEvent(chaos) {
    this.chaosIcon.textContent = chaos.type === "rain_rush" ? "⛈️" : chaos.type === "competing_buyer" ? "🏃💨" : "🕶️";
    this.chaosTitle.textContent = chaos.title;
    this.chaosDescription.textContent = chaos.description;
    this.chaosActions.innerHTML = "";

    if (chaos.type === "competing_buyer") {
      sounds.playCallbackWhistle();
      const btnMatch = document.createElement("button");
      btnMatch.className = "btn-accept";
      btnMatch.textContent = `Match & Pay ${NegotiationEngine.formatNaira(chaos.rivalBid)}`;
      btnMatch.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        this.handleOffer(chaos.rivalBid);
      });

      const btnBluff = document.createElement("button");
      btnBluff.className = "btn-restart";
      btnBluff.style.background = "#38bdf8";
      btnBluff.textContent = `Call Bluff: "Sell am to am if you fit!"`;
      btnBluff.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        this.appendDialogueBubble("player", "Oga, sell am to am if you fit! Dey play!");
        this.appendDialogueBubble("seller", "Mcheww! The other guy na time waster, he no even hold cash. Oya let us continue our price.", "bubble-callback");
      });

      this.chaosActions.appendChild(btnMatch);
      this.chaosActions.appendChild(btnBluff);
    } else if (chaos.type === "rain_rush") {
      sounds.playThunder();
      this.rainOverlay.classList.add("active");

      const btnTakeRain = document.createElement("button");
      btnTakeRain.className = "btn-accept";
      btnTakeRain.textContent = `Seize Rain Discount: Pay ${NegotiationEngine.formatNaira(chaos.discountPrice)}`;
      btnTakeRain.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        this.engine.status = "agreed";
        this.engine.agreedPrice = chaos.discountPrice;
        sounds.playCoinSound();
        this.appendDialogueBubble("seller", "Oya sharp sharp take am! Rain don start!", "bubble-callback");
        this.showEafcGrade();
      });

      const btnPassRain = document.createElement("button");
      btnPassRain.className = "btn-walk-away";
      btnPassRain.textContent = "Keep Haggling in the Rain";
      btnPassRain.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        this.appendDialogueBubble("player", "Rain or no rain, price must still drop!");
      });

      this.chaosActions.appendChild(btnTakeRain);
      this.chaosActions.appendChild(btnPassRain);
    } else if (chaos.type === "agbero_salute") {
      const tipAmount = chaos.tipAmount || 500;
      const formattedTip = NegotiationEngine.formatNaira(tipAmount);
      const btnSettle = document.createElement("button");
      btnSettle.className = "btn-accept";
      btnSettle.textContent = `Settle the Boys: Give ${formattedTip} Tip (+10 Patience)`;
      btnSettle.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        sounds.playCashSlap();
        this.engine.patience = Math.min(100, this.engine.patience + 10);
        this.updatePatienceUI();
        this.appendDialogueBubble("player", `*(Gives boys ${formattedTip})* Boys loyal! Make una drink cold pure water.`);
        this.appendDialogueBubble("seller", "Chairman! See as you settle the boys with respect! You be proper street boss!", "bubble-callback");
      });

      const btnIgnore = document.createElement("button");
      btnIgnore.className = "btn-walk-away";
      btnIgnore.textContent = "Ignore Area Boy & Mind Business";
      btnIgnore.addEventListener("click", () => {
        this.chaosModal.classList.remove("active");
        this.appendDialogueBubble("player", "I no get cash for anybody abeg.");
        this.appendDialogueBubble("seller", "Chairman, you wicked o! Anyway make we continue our market.");
      });

      this.chaosActions.appendChild(btnSettle);
      this.chaosActions.appendChild(btnIgnore);
    }

    setTimeout(() => {
      this.chaosModal.classList.add("active");
    }, 450);
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === "campaign") {
      this.btnModeCampaign.classList.add("active");
      this.btnModeFree.classList.remove("active");
      this.campaignHud.classList.add("active");
      this.marketSelectorBar.style.display = "none";
      this.itemSelectDropdown.disabled = true;
      this.renderCampaignBriefing(this.campaignDifficulty);
      this.campaignIntroModal.classList.add("active");
    } else {
      this.btnModeFree.classList.add("active");
      this.btnModeCampaign.classList.remove("active");
      this.campaignHud.classList.remove("active");
      this.campaignIntroModal.classList.remove("active");
      if (this.roadHazardModal) this.roadHazardModal.classList.remove("active");
      if (this.mamaReportModal) this.mamaReportModal.classList.remove("active");
      this.marketSelectorBar.style.display = "flex";
      this.itemSelectDropdown.disabled = false;
      this.campaignManager = null;
      this.btnPlayAgain.textContent = "Haggle Another Item";
      this.startSession();
    }
  }

  renderCampaignBriefing(difficulty = "standard") {
    this.currentErrandConfig = generateDynamicErrand(difficulty);
    if (!this.campaignIntroTitle) return;

    this.campaignIntroTitle.textContent = this.currentErrandConfig.title;
    this.campaignIntroBudgetText.textContent = `MISSION BUDGET: ${NegotiationEngine.formatNaira(this.currentErrandConfig.budget)} CASH`;
    this.campaignIntroDialogue.textContent = `"${this.currentErrandConfig.intro.dialogue}"`;

    this.campaignIntroQuestList.innerHTML = this.currentErrandConfig.quests
      .map((q) => {
        const m = MARKETS.find((market) => market.id === q.marketId);
        return `<li><b>${q.step}. ${m ? m.name : "Market"}:</b> ${q.itemName}</li>`;
      })
      .join("");
  }

  startCampaignMission() {
    if (!this.currentErrandConfig) {
      this.renderCampaignBriefing(this.campaignDifficulty);
    }
    this.campaignManager = new CampaignManager(this.currentErrandConfig);
    this.nextStallPatienceBonus = 0;
    this.loadCampaignStep();
  }

  showRoadHazardModal(hazard) {
    this.hazardIcon.textContent = hazard.icon || "🚌";
    this.hazardTitle.textContent = hazard.title;
    this.hazardDesc.textContent = hazard.desc;
    this.hazardOptionsList.innerHTML = "";

    hazard.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "hazard-opt-btn";

      let costBadge = "";
      if (opt.cost > 0) {
        costBadge = `<span style="color: #f87171; font-weight: 800;">-${NegotiationEngine.formatNaira(opt.cost)}</span>`;
      } else if (opt.cost < 0) {
        costBadge = `<span style="color: #34d399; font-weight: 800;">+${NegotiationEngine.formatNaira(Math.abs(opt.cost))}</span>`;
      } else {
        costBadge = `<span style="color: #38bdf8; font-weight: 800;">₦0</span>`;
      }

      btn.innerHTML = `<span>${opt.text}</span> ${costBadge}`;
      btn.addEventListener("click", () => {
        this.roadHazardModal.classList.remove("active");
        this.campaignManager.applyHazardOutcome(opt);

        if (opt.effect === "refresh") {
          this.nextStallPatienceBonus = 15;
          sounds.playSweetTalkChime();
        } else if (opt.effect === "bonus") {
          sounds.playCoinSound();
        } else if (opt.effect === "loss") {
          sounds.playInsultBuzz();
        }

        this.showTransitToast(opt.message);
        this.updateCampaignHud();

        setTimeout(() => {
          this.loadCampaignStep();
        }, 1200);
      });

      this.hazardOptionsList.appendChild(btn);
    });

    this.roadHazardModal.classList.add("active");
  }

  loadCampaignStep() {
    const quest = this.campaignManager.getCurrentQuest();
    if (!quest) {
      this.showMamaReport();
      return;
    }

    const mIdx = MARKETS.findIndex((m) => m.id === quest.marketId);
    if (mIdx !== -1) {
      this.currentMarketIndex = mIdx;
      const iIdx = MARKETS[mIdx].items.findIndex((it) => it.id === quest.itemId);
      this.currentItemIndex = iIdx !== -1 ? iIdx : 0;
    }

    this.showTransitToast(quest.transitMsg);
    this.updateCampaignHud();
    this.startSession();

    setTimeout(() => {
      this.appendDialogueBubble("player", `(Mama's errand target: ${quest.hint})`, "bubble-callback");
    }, 400);
  }

  updateCampaignHud() {
    if (!this.campaignManager) return;
    const remaining = this.campaignManager.currentBudget;
    const quest = this.campaignManager.getCurrentQuest();
    const pocketMoney = Math.max(0, remaining);
    const totalCount = this.campaignManager.config.itemCount;

    this.hudBudgetRemaining.textContent = NegotiationEngine.formatNaira(remaining);
    this.hudBudgetRemaining.className = `hud-value ${remaining < 20000 ? "highlight-yellow" : "highlight-green"}`;
    this.hudPocketMoney.textContent = NegotiationEngine.formatNaira(pocketMoney);

    if (quest) {
      const market = MARKETS.find((m) => m.id === quest.marketId);
      const item = market ? market.items.find((it) => it.id === quest.itemId) : null;
      this.hudCurrentTarget.textContent = `Target ${quest.step}/${totalCount}: ${item ? item.name : "Item"}`;
    } else {
      this.hudCurrentTarget.textContent = `All ${totalCount} Items Purchased!`;
    }
  }

  showTransitToast(msg) {
    this.transitToastText.textContent = msg;
    this.transitToast.classList.add("show");
    setTimeout(() => {
      this.transitToast.classList.remove("show");
    }, 3200);
  }

  renderMarketTabs() {
    this.marketSelectorBar.innerHTML = "";
    MARKETS.forEach((m, idx) => {
      const btn = document.createElement("button");
      btn.className = `market-chip ${idx === this.currentMarketIndex ? "active" : ""}`;
      btn.textContent = m.name;
      btn.addEventListener("click", () => {
        if (this.currentMarketIndex !== idx) {
          this.currentMarketIndex = idx;
          this.currentItemIndex = 0;
          this.renderMarketTabs();
          this.startSession();
        }
      });
      this.marketSelectorBar.appendChild(btn);
    });
  }

  startSession() {
    const market = MARKETS[this.currentMarketIndex];
    const seller = market.seller;
    const item = market.items[this.currentItemIndex];

    // Populate dropdown options
    this.itemSelectDropdown.innerHTML = market.items
      .map((it, idx) => `<option value="${idx}" ${idx === this.currentItemIndex ? "selected" : ""}>${it.name} (${NegotiationEngine.formatNaira(it.askingPrice)})</option>`)
      .join("");

    // Initialize fresh negotiation engine with current player Drip
    this.engine = new NegotiationEngine(item, seller, dripManager.currentPreset);

    // Apply any pending patience bonus (e.g. from Road Hazard Gala/refresh)
    if (this.nextStallPatienceBonus > 0) {
      this.engine.patience = Math.min(100, this.engine.patience + this.nextStallPatienceBonus);
      this.nextStallPatienceBonus = 0;
    }

    // Update 2D Sprites
    this.updateSprites();
    this.rainOverlay.classList.remove("active");

    // Reset Tactics Buttons
    this.tacticButtons.forEach((b) => b.classList.remove("used"));

    // Update Left Profile UI
    this.sellerAvatar.textContent = seller.avatar;
    this.sellerName.textContent = seller.name;
    this.sellerTitle = `${seller.title} • ${market.name}`;
    document.getElementById("sellerTitle").textContent = this.sellerTitle;
    this.itemIcon.textContent = item.icon;
    this.itemName.textContent = item.name;
    this.itemDesc.textContent = item.desc;
    const authBadge = document.getElementById("itemAuthenticityBadge");
    if (authBadge) {
      if (item.isOriginal) {
        authBadge.textContent = "★ CERTIFIED ORIGINAL MATERIAL";
        authBadge.style.color = "#f59e0b";
      } else {
        authBadge.textContent = "GRADE REPLICA / BALE THRIFT";
        authBadge.style.color = "#94a3b8";
      }
    }
    this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(this.engine.currentSellerPrice);
    this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(this.engine.currentSellerPrice);
    this.roundsCountDisplay.textContent = "0";

    // Reset Dialogue
    this.dialogueContainer.innerHTML = "";
    this.statusBadge.textContent = "NEGOTIATING";
    this.statusBadge.style.background = "rgba(16, 185, 129, 0.2)";
    this.statusBadge.style.color = "#34d399";

    // Initial seller greeting (shows bias if dressed like IJGB)
    let greeting = seller.dialogue.greetings[Math.floor(Math.random() * seller.dialogue.greetings.length)];
    if (dripManager.currentPreset.id === "ijgb") {
      greeting = "Ah ah! Dollar guy don land! Clean sneakers, iPhone! My boss, enter inside!";
    } else if (dripManager.currentPreset.id === "market_soldier") {
      greeting = "Senior man! I see say you be street guy, no long talk.";
    }

    this.appendDialogueBubble("seller", `${greeting} This ${item.name} na ${NegotiationEngine.formatNaira(this.engine.currentSellerPrice)}. How you see am?`);

    this.updatePatienceUI();
    this.offerInput.value = "";
    this.offerInput.placeholder = `E.g. 10k, 12,000, 15000...`;
    this.updateOfferPreview();
  }

  handleOffer(offerAmount) {
    const res = this.engine.submitOffer(offerAmount);
    if (res.error) {
      alert(res.error);
      return;
    }

    // Append Player Speech
    this.appendDialogueBubble("player", `Oga, I go pay ${NegotiationEngine.formatNaira(offerAmount)} for this.`);

    // Update Displays
    this.roundsCountDisplay.textContent = this.engine.rounds;
    this.updatePatienceUI();

    if (res.action === "insult") {
      sounds.playInsultBuzz();
      this.appendDialogueBubble("seller", res.text, "bubble-insult");
    } else if (res.action === "counter") {
      sounds.playCounterPop();
      this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      this.appendDialogueBubble("seller", res.text);

      // Check for Lagos Market Chaos Event!
      const chaos = this.engine.checkRandomChaos();
      if (chaos) {
        this.triggerChaosEvent(chaos);
      }
    } else if (res.action === "agreed") {
      sounds.playCoinSound();
      this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      this.appendDialogueBubble("seller", res.text);
      this.showEafcGrade();
    } else if (res.action === "lost") {
      sounds.playWalkoutSad();
      this.appendDialogueBubble("seller", res.text, "bubble-insult");
      this.showLossModal("Patience Exhausted!", "You pushed your luck too far. The seller gave you hot advice and kicked you out!");
    }
  }

  handleWalkAway() {
    this.appendDialogueBubble("player", "E cost abeg. I dey waka pass.");
    const res = this.engine.walkAway();

    if (res.calledBack) {
      sounds.playCallbackWhistle();
      this.appendDialogueBubble("seller", res.text, "bubble-callback");
      this.askingPriceDisplay.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      this.btnAcceptPriceText.textContent = NegotiationEngine.formatNaira(res.sellerPrice);

      // Open dramatic callback modal
      this.callbackQuote.textContent = `"${res.text}"`;
      this.callbackPriceTag.textContent = NegotiationEngine.formatNaira(res.sellerPrice);
      this.callbackModal.classList.add("active");
    } else {
      sounds.playWalkoutSad();
      this.appendDialogueBubble("seller", res.text);
      this.showLossModal("You Walked Away!", res.text);
    }
  }

  updatePatienceUI() {
    const p = Math.max(0, this.engine.patience);
    this.patienceBarFill.style.width = `${p}%`;

    let mood = "Chill";
    let color = "#10b981"; // Green

    if (p < 30) {
      mood = "Boiling Blood (Angry)";
      color = "#ef4444"; // Red
    } else if (p < 65) {
      mood = "Agitated / Annoyed";
      color = "#f59e0b"; // Yellow
    }

    this.patienceBarFill.style.backgroundColor = color;
    this.patiencePercentText.textContent = `${p}% (${mood})`;
  }

  updateOfferPreview() {
    if (!this.offerLivePreview) return;
    const raw = this.offerInput.value.trim();
    if (!raw) {
      this.offerLivePreview.style.display = "none";
      return;
    }
    const parsed = NegotiationEngine.parseAmount(raw);
    if (parsed && parsed > 0) {
      this.offerLivePreview.textContent = `= ${NegotiationEngine.formatNaira(parsed)}`;
      this.offerLivePreview.style.display = "block";
    } else {
      this.offerLivePreview.style.display = "none";
    }
  }

  appendDialogueBubble(speaker, text, extraClass = "") {
    const div = document.createElement("div");
    div.className = `speech-bubble bubble-${speaker} ${extraClass}`;
    div.textContent = text;
    this.dialogueContainer.appendChild(div);
    this.dialogueContainer.scrollTop = this.dialogueContainer.scrollHeight;
  }

  showEafcGrade() {
    const gradeData = this.engine.calculateGrade();
    if (!gradeData) return;

    if (gradeData.grade === "A+" || gradeData.grade === "A") {
      sounds.playFanfare();
    } else {
      sounds.playCoinSound();
    }

    this.gradeBadge.textContent = gradeData.grade;
    this.gradeBadge.className = `eafc-badge ${gradeData.badgeColor}`;
    this.gradeTitle.textContent = gradeData.title;
    this.gradeComment.textContent = gradeData.comment;

    this.statOpening.textContent = NegotiationEngine.formatNaira(gradeData.openingPrice);
    this.statAgreed.textContent = NegotiationEngine.formatNaira(gradeData.agreedPrice);
    this.statFloor.textContent = NegotiationEngine.formatNaira(gradeData.floorPrice);
    this.statSaved.textContent = `${NegotiationEngine.formatNaira(gradeData.moneySaved)} (${gradeData.savingsPercent}%)`;
    this.statRounds.textContent = gradeData.rounds;
    this.statPatience.textContent = `${gradeData.remainingPatience}%`;

    this.statusBadge.textContent = "DEAL SEALED";
    this.statusBadge.style.background = "rgba(16, 185, 129, 0.4)";
    this.statusBadge.style.color = "#a7f3d0";

    // Campaign Flow Handling
    if (this.mode === "campaign" && this.campaignManager) {
      const currentQuest = this.campaignManager.getCurrentQuest();
      const currentItem = MARKETS[this.currentMarketIndex].items[this.currentItemIndex];
      this.campaignManager.recordPurchase(currentQuest, currentItem, gradeData.agreedPrice, gradeData);
      this.updateCampaignHud();

      const nextQuest = this.campaignManager.getCurrentQuest();
      if (this.campaignManager.status === "bankrupt") {
        this.btnPlayAgain.textContent = "Bankruptcy! Return to Mama ➔";
      } else if (!nextQuest) {
        this.btnPlayAgain.textContent = "Deliver All Goods to Mama ➔";
      } else {
        const nextMarket = MARKETS.find((m) => m.id === nextQuest.marketId);
        this.btnPlayAgain.textContent = `Next Errand: Go to ${nextMarket.name} ➔`;
      }
    } else {
      this.btnPlayAgain.textContent = "Haggle Another Item";
    }

    setTimeout(() => {
      this.gradeModal.classList.add("active");
    }, 600);
  }

  showMamaReport() {
    if (!this.campaignManager) return;
    const rep = this.campaignManager.evaluateCampaign();

    if (rep.badge === "S" || rep.badge === "A") {
      sounds.playFanfare();
    } else if (rep.isBankrupt) {
      sounds.playWalkoutSad();
    } else {
      sounds.playCoinSound();
    }

    this.mamaBadge.textContent = rep.badge;
    this.mamaBadge.className = `eafc-badge ${rep.badgeColor}`;
    this.mamaVerdictTitle.textContent = rep.title;
    this.mamaVerdictQuote.textContent = `"${rep.quote}"`;
    if (this.mamaStatInitialBudget) {
      this.mamaStatInitialBudget.textContent = NegotiationEngine.formatNaira(rep.initialBudget);
    }
    this.mamaStatSpent.textContent = NegotiationEngine.formatNaira(rep.totalSpent);
    this.mamaStatSaved.textContent = NegotiationEngine.formatNaira(rep.pocketMoney);
    if (this.mamaStatAuthenticity) {
      this.mamaStatAuthenticity.textContent = `★ ${rep.originalCount} Original${rep.originalCount === 1 ? "" : "s"} • ${rep.replicaCount} Replica${rep.replicaCount === 1 ? "" : "s"}`;
    }

    // Render receipt items with Authenticity tags and Mama's witty commentary
    this.mamaReceiptsList.innerHTML = rep.purchases
      .map(
        (p) => `
        <div class="receipt-item-card">
          <div class="receipt-header-row">
            <span>
              ${p.item.icon} <b>${p.item.name}</b>
              <span class="receipt-auth-badge ${p.item.isOriginal ? "original" : "replica"}">
                ${p.item.isOriginal ? "★ Certified Original" : "Grade Replica"}
              </span>
            </span>
            <span style="color: #10b981; font-weight: 800;">
              ${NegotiationEngine.formatNaira(p.price)} (${p.evaluation?.grade || "Deal"})
            </span>
          </div>
          <div class="receipt-mama-quote">
            ${p.mamaInspection || "Mama nodded approvingly."}
          </div>
        </div>
      `
      )
      .join("");

    this.mamaReportModal.classList.add("active");
  }

  showLossModal(title, message) {
    this.lossTitle.textContent = title;
    this.lossMessage.textContent = message;
    this.statusBadge.textContent = "DEAL FAILED";
    this.statusBadge.style.background = "rgba(239, 68, 68, 0.2)";
    this.statusBadge.style.color = "#fca5a5";

    setTimeout(() => {
      this.lossModal.classList.add("active");
    }, 600);
  }
}

// Boot game when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  new HaggleApp();
});
