/**
 * data.js - Lagos Market Haggling Game Data
 * Stalls, Sellers, Items (with isOriginal authenticity flags), and Nigerian Pidgin Dialogue Tables
 */

export const MARKETS = [
  {
    id: "yaba",
    name: "Yaba Market (Tejuosho)",
    tagline: "The Home of Grade-1 Okrika & Vintage Drip",
    bgGradient: "from-amber-900 to-stone-900",
    seller: {
      name: "Bros Emeka",
      title: "Senior Okrika Merchant",
      avatar: "👔",
      personality: "Fast-talking, calls everybody Chairman or Boss, loves hyperbole",
      basePatience: 100,
      patienceLossPerOffer: 12,
      insultToleranceRatio: 0.65,
      callbackChance: 0.75,
      dialogue: {
        greetings: [
          "Chairman! My personal person! Enter here, I get your exact size!",
          "Boss! See pure London used drip, no be that fake one dem dey sell for road!",
          "Customer of life! You don reach proper shop today. What can I pack for you?"
        ],
        insults: [
          "Chineke God! Which kind bad morning be this?! You wan close my shop today?!",
          "Commot for my front! I be your age mate? You think say na dustbin I pick am from?!",
          "Thunder fire this your price! Go buy am for refuse dump if you no get money!",
          "Ah ah! Oga, you dey whine me? Even the nylon bag cost pass this your price!"
        ],
        grumblingCounter: [
          "Haba chairman, you wan kill person? Even me wey carry am from wharf, I no buy am that price. Drop {counter} make we talk.",
          "Abeg reason with me. Dollar don rise o! Last price na {counter}, I no fit go lower pass that.",
          "Look the quality well well! Touch am! You no see say na pure cotton? Last last, bring {counter}.",
          "You wicked for market o! Make I just do giveaway... Pay {counter} make you carry am."
        ],
        softenedCounter: [
          "Oya, because your face smooth and you be first customer, pay {counter}.",
          "I like your vibe, bros. Drop {counter} make I give you receipt once.",
          "Hmm, you know how to negotiate well well. Take am for {counter}."
        ],
        acceptedDeal: [
          "Oya, take am! Na because of morning market I gree o. No tell anybody this price!",
          "You squeeze all my profit commot! But no wahala, carry am go, my chairman.",
          "Deal! Next time you come, ask for Bros Emeka. Your pocket go always bless!"
        ],
        walkAwayCallback: [
          "Customer! Hey! Where you dey go? Oya come back! Which kind wahala be this... Talk your real last!",
          "Boss wait na! Don't go like that! Oya bring {counter} make I release am for you!",
          "Hey brother! No vex! Come back, make we settle am like gentlemen!"
        ],
        walkAwayLost: [
          "Waka pass! Bad belle person, market never open you don come disturb person!",
          "Bye bye! Go round the whole market, you go still come back here!",
          "Shift jor! Person wey no get money dey waka market."
        ],
        outOfPatience: [
          "Oga, my head don hot! Market don close for you today, shift commot!",
          "I no dey sell again! You don waste my saliva finish today!",
          "Commot! Go meet another shop, you dey give me headache!"
        ]
      }
    },
    items: [
      {
        id: "vintage_jacket",
        name: "Vintage London Oversized Denim",
        desc: "Grade-1 Okrika from UK bale. Heavyweight, washed once, smells like vintage thrift.",
        askingPrice: 28000,
        floorPrice: 9000,
        marketFairPrice: 13000,
        icon: "🧥",
        isOriginal: false // Bale thrift, can find minor loose threads!
      },
      {
        id: "levis_selvedge",
        name: "Original 1990s Levi's 501 Selvedge",
        desc: "Genuine heavyweight Sanforized denim with authentic Red Tab. Rare collector specimen.",
        askingPrice: 55000,
        floorPrice: 22000,
        marketFairPrice: 32000,
        icon: "👖",
        isOriginal: true // Pure genuine vintage; inspecting fault offends Emeka!
      },
      {
        id: "dior_sneakers",
        name: "Dior B23 'Original Replica' Sneakers",
        desc: "Direct from Vietnam. Seller claims 'even Dior CEO cannot spot the difference'.",
        askingPrice: 45000,
        floorPrice: 16000,
        marketFairPrice: 22000,
        icon: "👟",
        isOriginal: false
      },
      {
        id: "gucci_shades",
        name: "Retro Tinted Sunglasses",
        desc: "UV protection not guaranteed, but 100% maximum street respect.",
        askingPrice: 15000,
        floorPrice: 4500,
        marketFairPrice: 7000,
        icon: "🕶️",
        isOriginal: false
      }
    ]
  },
  {
    id: "balogun",
    name: "Balogun Island Market",
    tagline: "High Stakes Fabrics, Lace & Traditional Splendor",
    bgGradient: "from-emerald-900 to-teal-950",
    seller: {
      name: "Mama Nkechi",
      title: "Fabric Empress of Balogun",
      avatar: "🧕🏾",
      personality: "Motherly guilt trips, loud dramatic reactions, emotional bargaining",
      basePatience: 100,
      patienceLossPerOffer: 15,
      insultToleranceRatio: 0.70,
      callbackChance: 0.80,
      dialogue: {
        greetings: [
          "My fine daughter / handsome son! Come and look at real Swiss lace!",
          "Ah! See as your skin dey glow! You need this fabric for your next owanbe!",
          "Welcome o! May God bless your pocket as you enter Mama Nkechi's stall!"
        ],
        insults: [
          "Mbanu! God forbid! Is it because I am smiling that you want to insult my ancestors?!",
          "Holy Ghost fire! Look at this child o! Do you think I picked this lace from gutter?!",
          "Blood of Zechariah! Did your mother send you to punish me today?!",
          "Tufiakwa! Don't call that cursed price inside my shop again!"
        ],
        grumblingCounter: [
          "My pikin, you want to kill an old woman? I have school fees to pay o. Pay {counter}.",
          "Haba! Have the fear of God small! Even the shipping from Austria was huge. Bring {counter}.",
          "You are squeezing me like lemon! The absolute least I can do is {counter}.",
          "Because you look like my nephew, I will leave it for {counter}. Don't price it down again!"
        ],
        softenedCounter: [
          "You have sweet mouth, my pikin. Bring {counter} make I cut the yard for you.",
          "I will bless you with this one. Pay {counter} and carry the blessing go.",
          "Oya, no problem. Drop {counter} so both of us will be happy."
        ],
        acceptedDeal: [
          "God bless you! Your marriage will last, your children will be fruitful! Take am!",
          "You are a very tough child! But take it, mama loves you.",
          "Deal! Tell all your friends that Mama Nkechi sells the purest quality!"
        ],
        walkAwayCallback: [
          "Customer! Where are you going?! Come back here! Do you want to break mama's heart?!",
          "Wait! Don't go out to the sun! Oya come, take it for {counter}!",
          "My pikin, stop! Don't walk away with annoyance! Bring {counter} make we settle!"
        ],
        walkAwayLost: [
          "Go in peace! May you find what you are looking for elsewhere, but you won't find this quality!",
          "Waka go! Market is big, go test your luck in the heat!",
          "Mcheww! Time waster, go front!"
        ],
        outOfPatience: [
          "I cannot talk again! My blood pressure is rising! Please leave my shop!",
          "Enough is enough! You are not ready to buy, go and play elsewhere!",
          "My mouth has dried up. Leave me alone!"
        ]
      }
    },
    items: [
      {
        id: "swiss_voile",
        name: "5 Yards Pure Swiss Voile Lace",
        desc: "Certified Austrian hand-embroidered Voile. Guaranteed royalty at any Owanbe.",
        askingPrice: 75000,
        floorPrice: 28000,
        marketFairPrice: 38000,
        icon: "🧵",
        isOriginal: true // Genuine Austrian import! Inspecting fault offends Mama!
      },
      {
        id: "aso_oke",
        name: "Handwoven Metallic Aso-Oke Set",
        desc: "Handcrafted in Iseyin with pure silver threading. Includes Gele and Ipele.",
        askingPrice: 50000,
        floorPrice: 19000,
        marketFairPrice: 26000,
        icon: "👑",
        isOriginal: true // Authentic handwoven
      },
      {
        id: "wax_ankara",
        name: "Hollandis Real Dutch Wax (6 Yards)",
        desc: "Vibrant peacock pattern. High-quality print, soft texture.",
        askingPrice: 32000,
        floorPrice: 11000,
        marketFairPrice: 16000,
        icon: "🎨",
        isOriginal: false
      },
      {
        id: "italian_silk",
        name: "Pure Italian Raw Silk Brocade",
        desc: "Heavyweight floral embossed raw silk from Milan. Shines with pure elegance.",
        askingPrice: 90000,
        floorPrice: 42000,
        marketFairPrice: 55000,
        icon: "✨",
        isOriginal: true
      }
    ]
  },
  {
    id: "computer_village",
    name: "Computer Village, Ikeja",
    tagline: "Otigba Street: Phones, Laptops & 'UK Used' Secrets",
    bgGradient: "from-blue-950 to-slate-900",
    seller: {
      name: "Engr. Chidi Tech",
      title: "Hardware Alchemist & iPhone Plug",
      avatar: "👨🏾‍💻",
      personality: "Calculated, fast-talking tech hustler, throws technical jargon to justify prices",
      basePatience: 100,
      patienceLossPerOffer: 14,
      insultToleranceRatio: 0.72,
      callbackChance: 0.70,
      dialogue: {
        greetings: [
          "Big man! You need original UK-used phone? Battery health 100%, never opened!",
          "Otigba tech master here! What spec are you looking for today? Core i7? Apple Silicon?",
          "Boss, don't buy carton water for street o. Step inside, genuine gadgets only!"
        ],
        insults: [
          "Bros, dey play! Even the charger adapter alone cost more than your offer!",
          "Are you joking or you want me to sell you dummy phone from China?!",
          "Comot here, my guy! Go buy itel for roadside with this your budget!",
          "Guy, you dey whine me? This one na Factory Unlocked o, no be gevey sim!"
        ],
        grumblingCounter: [
          "Bros, clear receipt, face ID working, True Tone active. Bottom line na {counter}.",
          "My guy, custom duty alone at airport killed us. Last price na {counter}.",
          "I no dey chop profit on this unit at all. Give me {counter} make you carry am.",
          "Oga, I give you 3 months warranty on top. Pay {counter} make we wrap am."
        ],
        softenedCounter: [
          "Alright boss, because you understand tech, I go leave am for {counter}.",
          "Sharp guy! You know market price. Drop {counter} and take free casing.",
          "Oya, transfer {counter} right now and we call it done."
        ],
        acceptedDeal: [
          "Done deal! Bring money, test the camera before you step out!",
          "Sharp negotiation, chairman! You beat me down, but business is business.",
          "Collect am! Make you give my number to your boys!"
        ],
        walkAwayCallback: [
          "Guy! Wait! Where you dey go?! Oya hold on! What is your final transfer budget?!",
          "Chairman, don't walk away from original device! Come, pay {counter}!",
          "Oga wait! Na original True Tone o! Come back take am for {counter}!"
        ],
        walkAwayLost: [
          "Waka pass, bros! Go test that cheap one down the street make screen turn white tomorrow!",
          "You will be back! Only Chidi Tech has clean IMEI in this whole Ikeja!",
          "Cool story, bros. Shift make better customer buy."
        ],
        outOfPatience: [
          "Guy, battery of my patience don reach 1%! Go charge your money before you come back!",
          "I have laptops to flash and screens to swap. No time for child's play!",
          "Market closed for you, chief. Move along!"
        ]
      }
    },
    items: [
      {
        id: "iphone_12_pro",
        name: "iPhone 12 Pro (128GB) 'UK Used'",
        desc: "Graphite black, True Tone guaranteed, original Apple logic board, clean IMEI.",
        askingPrice: 380000,
        floorPrice: 240000,
        marketFairPrice: 285000,
        icon: "📱",
        isOriginal: true // Original Factory Unlocked Apple motherboard!
      },
      {
        id: "macbook_air",
        name: "MacBook Air M1 (Silver)",
        desc: "Apple Silicon, 256GB SSD, Cycle count 112. Pristine keyboard, original MagSafe.",
        askingPrice: 620000,
        floorPrice: 420000,
        marketFairPrice: 480000,
        icon: "💻",
        isOriginal: true
      },
      {
        id: "power_bank",
        name: "20,000mAh Super-Fast Power Bank",
        desc: "Dual USB-C, built-in emergency torchlight for sudden NEPA blackouts.",
        askingPrice: 35000,
        floorPrice: 13000,
        marketFairPrice: 18000,
        icon: "🔋",
        isOriginal: false
      },
      {
        id: "airpods_pro",
        name: "AirPods Pro (2nd Gen) 'Grade 1 Clone'",
        desc: "Pop-up animation works on iOS, active noise cancellation is mostly psychological.",
        askingPrice: 25000,
        floorPrice: 8000,
        marketFairPrice: 12000,
        icon: "🎧",
        isOriginal: false
      }
    ]
  },
  {
    id: "mile12",
    name: "Mile 12 Food Market",
    tagline: "The Mega-Hub of Yams, Rice & Northern Agricultural Bounty",
    bgGradient: "from-amber-950 to-orange-950",
    seller: {
      name: "Alhaji Danladi",
      title: "Yam & Agricultural Commodity King",
      avatar: "👳🏾‍♂️",
      personality: "Calm, dignified Hausa merchant, speaks measured Pidgin, takes pride in honest crops",
      basePatience: 100,
      patienceLossPerOffer: 11,
      insultToleranceRatio: 0.68,
      callbackChance: 0.70,
      dialogue: {
        greetings: [
          "Sannu customer! Welcome to Mile 12. Fresh harvest from the north just arrived!",
          "Aboki na! Look this Abuja yam, sweet like sugar, dry like flour!",
          "Enter inside, customer. Pure wholesale price, no middlemen!"
        ],
        insults: [
          "Subhanallah! What kind of joke is this? Did I harvest this yam with sand?!",
          "Haba Alhaji! Go and buy cassava if you don't have money for real yam!",
          "God forbid! Do you know how much diesel costs from Niger state to Lagos?!"
        ],
        grumblingCounter: [
          "Customer, be fair. Transporters took all our profit. Bottom price na {counter}.",
          "Haba, don't squeeze farmer. Take am for {counter} make you carry am.",
          "I no fit go below {counter}. Yam cost for farm this season."
        ],
        softenedCounter: [
          "Toh, because you be good customer, take am for {counter}.",
          "Allah bless your soup pot. Drop {counter} make boys load am for your boot.",
          "No wahala, pay {counter} and carry the blessing go."
        ],
        acceptedDeal: [
          "Bissmillah! Deal closed. May this food bring long life to your family!",
          "You negotiate well, customer. Take am go!",
          "Done! When next you need wholesale yam, ask for Alhaji Danladi."
        ],
        walkAwayCallback: [
          "Customer! Tsaya (wait)! Why you dey rush? Come back, take am for {counter}!",
          "Haba oga! Don't enter the heat! Bring {counter} make we settle!",
          "Customer of life! Come back, let us do business!"
        ],
        walkAwayLost: [
          "Toh, safe journey! You won't find this sweet yam in any supermarket!",
          "Waka go, Allah will send another buyer.",
          "Safe trip in Lagos traffic!"
        ],
        outOfPatience: [
          "My patience has finished! Please allow other people to buy!",
          "I have trucks to offload. Kai, leave my stall!",
          "No more talking today. Shift!"
        ]
      }
    },
    items: [
      {
        id: "abuja_yams",
        name: "Bundle of 5 Grade-1 Abuja Yams",
        desc: "Massive dry tubers from the fertile hills of Abuja. Perfect for pounded yam.",
        askingPrice: 35000,
        floorPrice: 15000,
        marketFairPrice: 20000,
        icon: "🍠",
        isOriginal: true // Real organic farm produce! Claiming rot enrages Danladi!
      },
      {
        id: "foreign_rice",
        name: "50kg Bag of 'Special Foreign' Rice",
        desc: "Royal Stallion sack, long grain. Local parboiled rice cleverly re-bagged.",
        askingPrice: 78000,
        floorPrice: 48000,
        marketFairPrice: 56000,
        icon: "🌾",
        isOriginal: false // Re-bagged local rice! Inspecting fault spots the thread!
      },
      {
        id: "basket_tomatoes",
        name: "Big Raffia Basket of Jos Tomatoes & Rodo",
        desc: "Plump, deep-red, firm plum tomatoes direct from Plateau State farms.",
        askingPrice: 25000,
        floorPrice: 11000,
        marketFairPrice: 15000,
        icon: "🍅",
        isOriginal: true
      }
    ]
  },
  {
    id: "alaba",
    name: "Alaba International Market",
    tagline: "The Electronics Capital of West Africa (Ojo)",
    bgGradient: "from-purple-950 to-slate-950",
    seller: {
      name: "Chief Uche Power",
      title: "Alaba Electronics Mega-Lord",
      avatar: "🤴🏾",
      personality: "Wealthy merchant with tooth-pick, speaks heavy Igbo-Pidgin, proud of pure copper coil generators",
      basePatience: 100,
      patienceLossPerOffer: 13,
      insultToleranceRatio: 0.70,
      callbackChance: 0.75,
      dialogue: {
        greetings: [
          "Chairman! Welcome to Alaba International! Original heavy-duty appliances only!",
          "Odogwu! You want generator wey go carry whole duplex without shaking? Step in!",
          "Senior man! Pure copper coil we dey talk here, no be that roadside aluminum wire!"
        ],
        insults: [
          "Chineke Nna! Are you pricing original generator or electric kettle?!",
          "Look this boy o! Do you think I picked pure copper coil from gutter?!",
          "Commot for my warehouse! Go buy candle if you no get money for light!"
        ],
        grumblingCounter: [
          "Chairman, dollar to naira at wharf killed us. Bottom line na {counter}.",
          "Look the weight! Pure copper coil heavy like rock. Last price na {counter}.",
          "I no dey sell fake things here. Drop {counter} make boys load am for your motor."
        ],
        softenedCounter: [
          "Alright boss, because you be big man, take am for {counter}.",
          "Odogwu, pay {counter} and carry 1-year guarantee.",
          "Oya no wahala, transfer {counter} make we wrap am."
        ],
        acceptedDeal: [
          "Deal! Carry am go! When generator roar, your neighbors go salute!",
          "Sharp business, chairman! Next time you need solar, ask for Chief Uche!",
          "Receipt issued! May your house never see darkness again!"
        ],
        walkAwayCallback: [
          "Chairman! Hold on! Where you dey waka go? Oya come back, take am for {counter}!",
          "Chief! Don't go outside to buy aluminum coil wey go burn tomorrow! Take {counter}!",
          "Boss wait! Come back make we seal am like brothers!"
        ],
        walkAwayLost: [
          "Waka go! When that cheap one burn your fridge, you go still come back here!",
          "Bye bye! Only Chief Uche get genuine copper coil in this section!",
          "Shift make better customer enter!"
        ],
        outOfPatience: [
          "I no get strength for child's play today! Shift commot for my warehouse!",
          "Boys, clear this person make forklift pass!",
          "Business don close for you!"
        ]
      }
    },
    items: [
      {
        id: "lutian_generator",
        name: "Lutian 3.5kVA Pure Copper Generator",
        desc: "Key-start, 100% pure copper coil windings. Powers freezer, TV and 1.5HP AC.",
        askingPrice: 320000,
        floorPrice: 195000,
        marketFairPrice: 235000,
        icon: "⚡",
        isOriginal: true // 100% pure copper coil; questioning it offends Chief Uche!
      },
      {
        id: "smart_tv_55",
        name: "55-Inch 4K 'Samsung' Curved Smart TV",
        desc: "Alaba customized casing with brilliant colors and generic Android board.",
        askingPrice: 240000,
        floorPrice: 135000,
        marketFairPrice: 165000,
        icon: "📺",
        isOriginal: false // Casing assembled in Alaba; inspecting fault catches the generic remote!
      },
      {
        id: "jbl_boombox",
        name: "JBL Boombox 3 Wireless Speaker",
        desc: "Massive bass, flashing RGB rings. Seller claims 'Waterproof up to Third Mainland Bridge'.",
        askingPrice: 85000,
        floorPrice: 36000,
        marketFairPrice: 48000,
        icon: "🔊",
        isOriginal: false
      },
      {
        id: "solar_inverter",
        name: "3.5kVA Hybrid Solar Inverter System",
        desc: "Pure Sine Wave, German high-frequency transformer with MPPT solar charge controller.",
        askingPrice: 450000,
        floorPrice: 285000,
        marketFairPrice: 335000,
        icon: "☀️",
        isOriginal: true
      }
    ]
  }
];

export const STORY_SCENARIOS = [
  {
    title: "Saturday Owanbe Party Emergency",
    dialogue: "Listen to me well well! Your cousin's wedding introduction is next weekend. The family committee said we must bring authentic fabrics and foodstuff. Here is the cash. Whatever money you save is your pocket money! But if you let those market thieves finish my money, don't enter this house!"
  },
  {
    title: "NEPA Blackout & Survival Crisis",
    dialogue: "Transformer for our street don explode again! Light no dey, generator don knock, and food don finish for house! Run to the markets and rescue this house before darkness falls. Squeeze their neck for prices, every kobo you save belongs to you!"
  },
  {
    title: "Uncle London Returnee Rush",
    dialogue: "Your rich uncle's flight from Heathrow is landing tonight at Murtala Muhammed Airport! We need fresh provisions and drip before his convoy arrives. Don't let them cheat you like a JJC. Bring back good change!"
  },
  {
    title: "Weekend Family Provisions Run",
    dialogue: "Saturday market is in full swing! Here is the family cash. Go and buy these items. Do not accept the first price they tell you, remember whose child you are! Keep whatever change you negotiate."
  }
];

export const ROAD_HAZARDS = [
  {
    id: "gala_lacasera",
    title: "Third Mainland Bridge Go-Slow!",
    icon: "🥤",
    desc: "Traffic is crawling at 5km/h. A street hawker taps your bus window holding ice-cold Lacasera and hot Gala for ₦700.",
    options: [
      {
        text: "Buy Cold Drink & Gala (Pay ₦700 from Pocket Money)",
        cost: 700,
        effect: "refresh",
        message: "Cold drink refreshed your soul! You arrive at the next market in high spirits (+15 Patience bonus)."
      },
      {
        text: "Endure the Lagos Heat (Save Your ₦700)",
        cost: 0,
        effect: "none",
        message: "You wiped sweat with your shirt and saved your ₦700. True street discipline!"
      }
    ]
  },
  {
    id: "pickpocket_alert",
    title: "Ojuelegba Bus Stop Commotion!",
    icon: "🏃💨",
    desc: "A suspicious guy in dark shades 'accidentally' bumps hard into you while boarding the Danfo!",
    options: [
      {
        text: "Keep Cash in Socks & Slap Hand Away",
        cost: 0,
        effect: "defend",
        message: "Sharp street boy! The pickpocket's hand caught empty air. All cash 100% intact!"
      },
      {
        text: "Check Pockets Frantically",
        cost: 1500,
        effect: "loss",
        message: "While you were checking, you noticed ₦1,500 transport change went missing! Lagos 101 lesson."
      }
    ]
  },
  {
    id: "mama_surprise_call",
    title: "Mama's Surprise Mid-Trip Call!",
    icon: "📞",
    desc: "Your phone rings in the bus! It's Mama calling to check your location.",
    options: [
      {
        text: "Pick & Reassure Her: 'I dey on top the matter!'",
        cost: -3000, // Negative cost = gain money!
        effect: "bonus",
        message: "Mama smiled! 'Good pikin! Your elder sister just transferred ₦3,000 transport bonus to your budget!'"
      },
      {
        text: "Pretend Network is Cracking: 'Hello? Hello Mama?!'",
        cost: 0,
        effect: "none",
        message: "You ended the call to avoid extra errand additions. Tactical retreat!"
      }
    ]
  },
  {
    id: "okada_shortcut",
    title: "Danfo Radiator Overheat!",
    icon: "🏍️",
    desc: "The yellow bus breaks down with steam pouring from the hood! Driver shouts: 'Everybody come down make una push!'",
    options: [
      {
        text: "Take Quick Okada Motorcycle (Pay ₦1,000)",
        cost: 1000,
        effect: "fast_transit",
        message: "Okada zoomed through Lagos traffic like an arrow! Arrived at the next stall in 3 minutes."
      },
      {
        text: "Help Push the Danfo (Save ₦1,000)",
        cost: 0,
        effect: "tired",
        message: "You pushed the bus until it roared back to life. Hands dirty, but ₦1,000 saved!"
      }
    ]
  }
];

export function generateDynamicErrand(difficulty = "standard") {
  const scenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)];

  let itemCount = 3;
  if (difficulty === "quick") itemCount = 2;
  if (difficulty === "mega") itemCount = 4;

  // Shuffle markets and pick unique ones
  const shuffledMarkets = [...MARKETS].sort(() => 0.5 - Math.random());
  const selectedMarkets = shuffledMarkets.slice(0, itemCount);

  let quests = [];
  let totalFloor = 0;
  let totalAsking = 0;

  selectedMarkets.forEach((m, idx) => {
    // Pick an item from this market
    const randomItem = m.items[Math.floor(Math.random() * m.items.length)];
    totalFloor += randomItem.floorPrice;
    totalAsking += randomItem.askingPrice;

    quests.push({
      step: idx + 1,
      marketId: m.id,
      itemId: randomItem.id,
      itemName: randomItem.name,
      hint: `Acquire ${randomItem.name} from ${m.seller.name} at ${m.name}.`,
      transitMsg: `Boarded transit to ${m.name}... Lagos street energy is 100%!`
    });
  });

  // Calculate tight, realistic budget: wholesale floor + 38% of mark-up
  const margin = totalAsking - totalFloor;
  const budget = Math.round((totalFloor + margin * 0.38) / 1000) * 1000;

  return {
    difficulty,
    title: scenario.title,
    budget,
    itemCount,
    intro: {
      mamaAvatar: "👵🏾",
      mamaName: "Mama Funke",
      dialogue: scenario.dialogue.replace("the cash", `₦${budget.toLocaleString()} cash`)
    },
    quests,
    roadHazard: ROAD_HAZARDS[Math.floor(Math.random() * ROAD_HAZARDS.length)],
    verdicts: {
      legendary: {
        minRatio: 0.38,
        title: "S-Tier: Pride of the Ancestors",
        quote: "Chai! My pikin! Blood of smart people dey run inside your vein! You saved {saved}! Take an extra ₦5,000 bonus go chop cold Chapman and Shawarma!"
      },
      sharp: {
        minRatio: 0.24,
        title: "A-Tier: Sharp Street Boy",
        quote: "You try well well! You saved {saved} for yourself. You no gree make them play you for market. Good job!"
      },
      average: {
        minRatio: 0.12,
        title: "B-Tier: Average Bargainer",
        quote: "Hmm, at least you brought back {saved} change. Next time squeeze their neck more, market women get too much profit!"
      },
      ajebutter: {
        minRatio: 0.01,
        title: "C-Tier: Ajebutter / Soft Life Victim",
        quote: "Look at what is remaining: only {saved}?! Ah ah, did they put charm in your eyes?! You almost dashed them all my money!"
      },
      disowned: {
        minRatio: 0,
        title: "F-Tier: Disowned from the Family",
        quote: "You finished all the money?! You didn't even bring 10 Naira change?! Pack your bag and go back to sleep inside the market!"
      }
    }
  };
}

// Backward compatible export for default
export const SATURDAY_ERRAND = generateDynamicErrand("standard");
