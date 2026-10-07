/**
 * drip.js - 2D Sprite Renderer & Lagos Drip Persona System
 * Renders customizable 2D SVG/Canvas characters and applies economic bias
 * based on how the player is dressed when entering the market.
 */

export const DRIP_PRESETS = [
  {
    id: "market_soldier",
    name: "Market Soldier (Street Veteran)",
    avatar: "🪖",
    tagline: "Worn slippers & black nylon polythene bag. You breathe Lagos street dust.",
    advantage: "Street Immunity: Lowest opening quote (+10%), patience decays 25% slower, and Fake Call bluff is super believable.",
    disadvantage: "Low-Roller Skepticism: Show Cash fails on luxury items, and luxury goods sellers start with lower patience.",
    stats: {
      quoteMultiplier: 1.10, // Lowest opening quote
      patienceShield: 1.25,  // 25% slower patience loss
      basePatienceMod: 0,
      callbackChance: 0.85,  // Sellers respect street veterans
      showCashBonus: -0.35,  // Cash flex is mocked as small dirty notes
      sweetTalkGain: 24,
      concessionBonus: 0.0,
      agberoToll: 200,       // Street respect: Agberos accept ₦200
      perk: "Lowest opening quote (+10%), high patience defense, and ₦200 Agbero toll."
    },
    statsDisplay: {
      quote: "+10% (Lowest)",
      patience: "Durable (+25% Defense)",
      callback: "85% Street Callback",
      cashPower: "Weak (Dirty notes mocked)"
    },
    visuals: {
      skinColor: "#7c4a27",
      headwear: "bucket_hat",
      headwearColor: "#57534e",
      shirt: "vintage_tee",
      shirtColor: "#3b82f6",
      pants: "folded_jeans",
      pantsColor: "#1e3a8a",
      accessory: "black_nylon_bag"
    }
  },
  {
    id: "ijgb",
    name: "IJGB / Diaspora Returnee",
    avatar: "🎧",
    tagline: "AirPods Max, clean white sneakers & iPhone 16 Pro. Looks like Heathrow Duty-Free.",
    advantage: "Panic Walkout & Cash Clout: 95% Walkaway Callback rate (sellers panic over losing a big spender), and Show Cash has +45% instant-closing power.",
    disadvantage: "Maga Tax & Lowball Rage: Opening prices are marked up +80%, Agberos demand ₦1,500 tolls, and lowballing triggers double patience drain.",
    stats: {
      quoteMultiplier: 1.80, // Heavy markup
      patienceShield: 0.85,  // Fragile patience
      basePatienceMod: 0,
      callbackChance: 0.95,  // Desperate pursuit by seller
      showCashBonus: 0.45,   // Massive closing power
      sweetTalkGain: 16,     // Teased for diaspora accent
      concessionBonus: 0.0,
      agberoToll: 1500,      // Maga tax
      perk: "95% Walkout Callback & +45% Show Cash power. But opening quotes are +80% higher."
    },
    statsDisplay: {
      quote: "+80% (Maga Tax)",
      patience: "Fragile (-15% Resistance)",
      callback: "95% (Panicked Pursuit)",
      cashPower: "God-Tier (+45% Close)"
    },
    visuals: {
      skinColor: "#8d5524",
      headwear: "designer_shades",
      headwearColor: "#18181b",
      shirt: "designer_polo",
      shirtColor: "#f8fafc",
      pants: "crisp_chinos",
      pantsColor: "#d97706",
      accessory: "iphone_airpods"
    }
  },
  {
    id: "student",
    name: "Student on a Budget",
    avatar: "🎒",
    tagline: "UNILAG/LASU campus backpack & clear spectacles. Surviving on monthly allowance.",
    advantage: "Sympathy & Lowball Grace: Sweet Talk gives a massive +38 patience, lowballing costs 45% less patience, and opening quotes are modest (+20%).",
    disadvantage: "Zero Clout & Ignored Walkouts: Show Cash always fails against high-ticket goods, and sellers won't chase if you walk away (only 45% callback).",
    stats: {
      quoteMultiplier: 1.20,
      patienceShield: 1.0,
      basePatienceMod: 0,
      callbackChance: 0.45,  // Assumed broke, let walk
      showCashBonus: -0.40,  // Cash flex mocked
      sweetTalkGain: 38,     // Massive motherly sympathy boost
      concessionBonus: 0.0,
      agberoToll: 200,       // Agberos let student pass with small change
      perk: "Sweet Talk gives +38 patience & lowballs are forgiven. But walkouts are ignored (45%)."
    },
    statsDisplay: {
      quote: "+20% (Low)",
      patience: "Lowball Forgiveness (-45% loss)",
      callback: "45% (Ignored as broke)",
      cashPower: "Negligible on Luxury"
    },
    visuals: {
      skinColor: "#6f3e1b",
      headwear: "spectacles",
      headwearColor: "#0284c7",
      shirt: "campus_hoodie",
      shirtColor: "#059669",
      pants: "cargo_pants",
      pantsColor: "#475569",
      accessory: "backpack"
    }
  },
  {
    id: "corporate",
    name: "Island Banker (9-to-5er)",
    avatar: "👔",
    tagline: "Pressed shirt, office ID lanyard & dress shoes. Sneaked out to the market on lunch break!",
    advantage: "Lunch-Hour Urgency: Sellers know office workers must leave quickly; seller counteroffers drop prices 15% faster per round, with +20% Show Cash reliability.",
    disadvantage: "Corporate Tax & Rush: Opening quote is marked up +45%, you start with -15 base patience (rushed clock), and Agberos charge ₦800.",
    stats: {
      quoteMultiplier: 1.45, // Island salary markup
      patienceShield: 1.0,
      basePatienceMod: -15,  // Rushed lunch break clock
      callbackChance: 0.75,
      showCashBonus: 0.20,   // Bank app transfer credibility
      sweetTalkGain: 20,
      concessionBonus: 0.15, // +15% bigger price cuts per round
      agberoToll: 800,       // Island corporate toll
      perk: "Sellers drop prices 15% faster per round. But starts with -15 patience & +45% quote."
    },
    statsDisplay: {
      quote: "+45% (Salary Tax)",
      patience: "-15 Start (Rushed Lunch)",
      callback: "75% Normal Callback",
      cashPower: "+20% Fast Transfer"
    },
    visuals: {
      skinColor: "#6b3c1b",
      headwear: "neat_fade",
      headwearColor: "#18181b",
      shirt: "crisp_shirt",
      shirtColor: "#93c5fd",
      pants: "pressed_trousers",
      pantsColor: "#1e293b",
      accessory: "office_id_badge"
    }
  }
];

export class DripManager {
  constructor() {
    this.currentPreset = DRIP_PRESETS[0]; // Default: Market Soldier
  }

  setPreset(presetId) {
    const found = DRIP_PRESETS.find((p) => p.id === presetId);
    if (found) {
      this.currentPreset = found;
    }
    return this.currentPreset;
  }

  /**
   * Generates a 2D SVG character sprite for the player
   */
  renderPlayerSvg() {
    const v = this.currentPreset.visuals;

    return `
      <svg viewBox="0 0 120 180" class="character-sprite" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="60" cy="172" rx="35" ry="7" fill="rgba(0,0,0,0.35)" />
        
        <!-- Shoes / Slippers -->
        <rect x="36" y="152" width="18" height="12" rx="4" fill="${v.pantsColor === '#d97706' ? '#fff' : '#1c1917'}" />
        <rect x="66" y="152" width="18" height="12" rx="4" fill="${v.pantsColor === '#d97706' ? '#fff' : '#1c1917'}" />
        
        <!-- Legs / Pants -->
        <rect x="38" y="100" width="16" height="54" rx="4" fill="${v.pantsColor}" />
        <rect x="66" y="100" width="16" height="54" rx="4" fill="${v.pantsColor}" />
        
        <!-- Torso / Shirt -->
        <rect x="30" y="55" width="60" height="52" rx="10" fill="${v.shirtColor}" />
        
        <!-- Arms -->
        <rect x="18" y="58" width="12" height="42" rx="5" fill="${v.skinColor}" />
        <rect x="90" y="58" width="12" height="42" rx="5" fill="${v.skinColor}" />
        
        <!-- Head / Neck -->
        <rect x="52" y="44" width="16" height="14" fill="${v.skinColor}" />
        <circle cx="60" cy="34" r="22" fill="${v.skinColor}" />
        
        <!-- Face Features -->
        <ellipse cx="53" cy="32" rx="2.5" ry="3.5" fill="#1c1917" />
        <ellipse cx="67" cy="32" rx="2.5" ry="3.5" fill="#1c1917" />
        <path d="M 54 44 Q 60 49 66 44" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
        
        <!-- Headwear Specifics -->
        ${this._renderHeadwear(v.headwear, v.headwearColor)}
        
        <!-- Accessory Specifics -->
        ${this._renderAccessory(v.accessory)}
      </svg>
    `;
  }

  /**
   * Generates a 2D SVG character sprite for the current market seller
   */
  renderSellerSvg(sellerType) {
    let skin = "#653a1a";
    let clothColor = "#f59e0b";
    let hat = "";

    if (sellerType === "Mama Nkechi") {
      skin = "#522e14";
      clothColor = "#059669";
      // Big dramatic emerald gele head-tie
      hat = `
        <ellipse cx="60" cy="18" rx="34" ry="16" fill="#10b981" />
        <ellipse cx="60" cy="12" rx="26" ry="12" fill="#34d399" />
        <circle cx="28" cy="34" r="5" fill="#facc15" />
        <circle cx="92" cy="34" r="5" fill="#facc15" />
      `;
    } else if (sellerType === "Alhaja Kudirat") {
      skin = "#45220d";
      clothColor = "#7e22ce";
      // Royal purple & gold gele with ornate gold necklace
      hat = `
        <ellipse cx="60" cy="16" rx="36" ry="18" fill="#9333ea" />
        <ellipse cx="60" cy="10" rx="28" ry="14" fill="#eab308" />
        <circle cx="60" cy="53" r="4.5" fill="#facc15" />
        <circle cx="50" cy="51" r="3.5" fill="#facc15" />
        <circle cx="70" cy="51" r="3.5" fill="#facc15" />
      `;
    } else if (sellerType === "Madam Peace") {
      skin = "#5a3118";
      clothColor = "#0d9488";
      // Teal silk wrap with silk scarf
      hat = `
        <ellipse cx="60" cy="20" rx="28" ry="12" fill="#14b8a6" />
        <path d="M 40 54 Q 60 70 80 54" stroke="#fef08a" stroke-width="4" fill="none" />
      `;
    } else if (sellerType === "Engr. Chidi Tech") {
      skin = "#784724";
      clothColor = "#2563eb";
      // Tech glasses and earpiece
      hat = `
        <rect x="42" y="28" width="15" height="10" rx="2" fill="none" stroke="#fff" stroke-width="2" />
        <rect x="63" y="28" width="15" height="10" rx="2" fill="none" stroke="#fff" stroke-width="2" />
        <line x1="57" y1="33" x2="63" y2="33" stroke="#fff" stroke-width="2" />
      `;
    } else if (sellerType === "Stanley Chips") {
      skin = "#683b1c";
      clothColor = "#1e1e2e";
      // Developer glasses and dark tech hoodie
      hat = `
        <circle cx="48" cy="32" r="7" fill="none" stroke="#38bdf8" stroke-width="2" />
        <circle cx="72" cy="32" r="7" fill="none" stroke="#38bdf8" stroke-width="2" />
        <line x1="55" y1="32" x2="65" y2="32" stroke="#38bdf8" stroke-width="2" />
        <path d="M 34 22 Q 60 12 86 22 L 88 30 L 32 30 Z" fill="#312e81" />
      `;
    } else if (sellerType === "Mama Bose Accessories") {
      skin = "#4c260f";
      clothColor = "#ea580c";
      // Bright orange outfit with big DJ headphones around neck
      hat = `
        <ellipse cx="60" cy="20" rx="30" ry="12" fill="#fb923c" />
        <path d="M 36 52 Q 60 76 84 52" stroke="#facc15" stroke-width="6" stroke-linecap="round" fill="none" />
        <circle cx="34" cy="52" r="6" fill="#111827" />
        <circle cx="86" cy="52" r="6" fill="#111827" />
      `;
    } else if (sellerType === "Alhaji Danladi") {
      skin = "#6b3c1b";
      clothColor = "#f8fafc";
      // Traditional Hausa embroidered cap and kaftan
      hat = `
        <path d="M 38 18 Q 60 8 82 18 L 84 28 L 36 28 Z" fill="#d97706" />
        <circle cx="60" cy="18" r="3" fill="#fef08a" />
        <line x1="42" y1="24" x2="78" y2="24" stroke="#fef08a" stroke-width="1.5" />
      `;
    } else if (sellerType === "Iya Moria") {
      skin = "#562c12";
      clothColor = "#b91c1c";
      // Vibrant tomato-red adire wrap with white market apron
      hat = `
        <ellipse cx="60" cy="16" rx="34" ry="16" fill="#ef4444" />
        <ellipse cx="60" cy="11" rx="26" ry="10" fill="#fca5a5" />
        <rect x="42" y="66" width="36" height="34" rx="4" fill="#f8fafc" />
      `;
    } else if (sellerType === "Mallam Garba") {
      skin = "#613619";
      clothColor = "#312e81";
      // Indigo northern babanriga with white prayer kufi
      hat = `
        <ellipse cx="60" cy="20" rx="24" ry="10" fill="#f8fafc" />
      `;
    } else if (sellerType === "Chief Uche Power") {
      skin = "#5e3215";
      clothColor = "#e2e8f0";
      // Red Okpu Agu chieftain cap with white feather and coral beads
      hat = `
        <path d="M 38 20 Q 60 10 82 20 L 84 28 L 36 28 Z" fill="#b91c1c" />
        <path d="M 44 20 Q 32 5 28 0" stroke="#f8fafc" stroke-width="3" stroke-linecap="round" fill="none" />
        <circle cx="50" cy="52" r="3.5" fill="#ef4444" />
        <circle cx="60" cy="54" r="3.5" fill="#ef4444" />
        <circle cx="70" cy="52" r="3.5" fill="#ef4444" />
      `;
    } else if (sellerType === "Bros Kingsley") {
      skin = "#663b1d";
      clothColor = "#4338ca";
      // Sound master headphones and silver chain
      hat = `
        <path d="M 36 22 Q 60 10 84 22 L 86 28 L 34 28 Z" fill="#0f172a" />
        <path d="M 34 32 Q 60 14 86 32" stroke="#6366f1" stroke-width="4" fill="none" />
        <circle cx="34" cy="34" r="6" fill="#4f46e5" />
        <circle cx="86" cy="34" r="6" fill="#4f46e5" />
        <circle cx="60" cy="54" r="4" fill="#e2e8f0" />
      `;
    } else if (sellerType === "Chief Obinna Solar") {
      skin = "#532a13";
      clothColor = "#ca8a04";
      // Gold solar embroidered robe with golden frames
      hat = `
        <ellipse cx="60" cy="18" rx="26" ry="12" fill="#a16207" />
        <rect x="44" y="28" width="13" height="9" rx="2" fill="none" stroke="#facc15" stroke-width="1.8" />
        <rect x="63" y="28" width="13" height="9" rx="2" fill="none" stroke="#facc15" stroke-width="1.8" />
        <line x1="57" y1="32" x2="63" y2="32" stroke="#facc15" stroke-width="1.8" />
      `;
    } else if (sellerType === "Sister Blessing") {
      skin = "#6c3e1e";
      clothColor = "#db2777";
      // Trendy pink blouse with retro cat-eye sunglasses
      hat = `
        <ellipse cx="60" cy="18" rx="28" ry="12" fill="#f43f5e" />
        <path d="M 40 30 L 52 30 L 48 35 Z" fill="#111" />
        <path d="M 68 30 L 80 30 L 72 35 Z" fill="#111" />
        <line x1="52" y1="30" x2="68" y2="30" stroke="#111" stroke-width="2" />
      `;
    } else if (sellerType === "Oga Segun") {
      skin = "#633719";
      clothColor = "#0284c7";
      // Backwards streetwear cap & sneaker chain
      hat = `
        <path d="M 34 22 Q 60 12 86 22 L 96 22 L 86 28 L 34 28 Z" fill="#0369a1" />
        <circle cx="60" cy="54" r="3.5" fill="#f59e0b" />
      `;
    } else {
      // Bros Emeka: Okrika cap and tape measure around neck
      hat = `
        <path d="M 36 22 Q 60 10 84 22 L 96 26 L 24 26 Z" fill="#b91c1c" />
        <path d="M 38 56 Q 60 85 82 56" stroke="#facc15" stroke-width="4" fill="none" />
      `;
    }

    return `
      <svg viewBox="0 0 120 180" class="character-sprite seller-sprite" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="60" cy="172" rx="35" ry="7" fill="rgba(0,0,0,0.35)" />
        
        <!-- Legs/Body behind stall counter -->
        <rect x="36" y="98" width="48" height="60" rx="6" fill="#1e293b" />
        <rect x="28" y="55" width="64" height="50" rx="10" fill="${clothColor}" />
        
        <!-- Arms resting on counter -->
        <rect x="14" y="58" width="14" height="40" rx="6" fill="${skin}" />
        <rect x="92" y="58" width="14" height="40" rx="6" fill="${skin}" />
        
        <!-- Head & Neck -->
        <rect x="52" y="44" width="16" height="14" fill="${skin}" />
        <circle cx="60" cy="34" r="22" fill="${skin}" />
        
        <!-- Eyes & Shouting Mouth -->
        <ellipse cx="52" cy="33" rx="2.5" ry="3.5" fill="#111" />
        <ellipse cx="68" cy="33" rx="2.5" ry="3.5" fill="#111" />
        <ellipse cx="60" cy="45" rx="5" ry="4" fill="#881337" />
        
        <!-- Custom Seller Dressing -->
        ${hat}
      </svg>
    `;
  }

  _renderHeadwear(headwear, color) {
    if (headwear === "bucket_hat") {
      return `
        <ellipse cx="60" cy="18" rx="26" ry="12" fill="${color}" />
        <ellipse cx="60" cy="22" rx="36" ry="6" fill="${color}" />
      `;
    } else if (headwear === "designer_shades") {
      return `
        <rect x="42" y="27" width="16" height="10" rx="2" fill="#09090b" />
        <rect x="62" y="27" width="16" height="10" rx="2" fill="#09090b" />
        <line x1="58" y1="31" x2="62" y2="31" stroke="#09090b" stroke-width="2" />
        <ellipse cx="36" cy="35" rx="4" ry="7" fill="#f8fafc" />
        <ellipse cx="84" cy="35" rx="4" ry="7" fill="#f8fafc" />
      `;
    } else if (headwear === "spectacles") {
      return `
        <circle cx="51" cy="33" r="7" fill="none" stroke="${color}" stroke-width="2" />
        <circle cx="69" cy="33" r="7" fill="none" stroke="${color}" stroke-width="2" />
        <line x1="58" y1="33" x2="62" y2="33" stroke="${color}" stroke-width="2" />
      `;
    } else if (headwear === "neat_fade") {
      return `
        <!-- Sharp barber line-up fade hair -->
        <path d="M 39 30 Q 60 12 81 30 L 83 20 Q 60 10 37 20 Z" fill="${color}" />
      `;
    }
    return "";
  }

  _renderAccessory(accessory) {
    if (accessory === "black_nylon_bag") {
      return `
        <!-- Black Polythene Bag held in left hand -->
        <path d="M 12 90 Q 6 120 14 135 Q 24 140 30 132 Q 32 105 24 90 Z" fill="#09090b" />
        <path d="M 16 88 Q 20 80 24 88" stroke="#09090b" stroke-width="3" fill="none" />
      `;
    } else if (accessory === "iphone_airpods") {
      return `
        <!-- iPhone held in hand -->
        <rect x="94" y="92" width="14" height="24" rx="3" fill="#18181b" stroke="#71717a" stroke-width="1.5" />
        <circle cx="101" cy="110" r="1.5" fill="#a1a1aa" />
      `;
    } else if (accessory === "backpack") {
      return `
        <!-- Campus backpack straps -->
        <line x1="38" y1="58" x2="38" y2="95" stroke="#047857" stroke-width="4" />
        <line x1="82" y1="58" x2="82" y2="95" stroke="#047857" stroke-width="4" />
      `;
    } else if (accessory === "office_id_badge") {
      return `
        <!-- Red Corporate Lanyard & Office Badge -->
        <line x1="53" y1="48" x2="60" y2="72" stroke="#ef4444" stroke-width="2" />
        <line x1="67" y1="48" x2="60" y2="72" stroke="#ef4444" stroke-width="2" />
        <rect x="54" y="72" width="12" height="17" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
        <rect x="56" y="74" width="8" height="6" fill="#0284c7" />
        <line x1="56" y1="83" x2="64" y2="83" stroke="#475569" stroke-width="1.5" />
      `;
    }
    return "";
  }
}

export const dripManager = new DripManager();
