/**
 * data.js - Lagos Market Haggling Game Data
 * Stalls, Sellers, Items with comprehensive item-specific and market-authentic dialogue,
 * Drip system bindings, and Saturday errand scenarios.
 */

export const MARKETS = [
  {
    id: "yaba",
    name: "Yaba Market (Tejuosho)",
    tagline: "The Home of Grade-1 Okrika & Vintage Drip",
    bgGradient: "from-amber-900 to-stone-900",
    sellers: [
      {
        id: "emeka",
        name: "Bros Emeka",
        title: "Senior Okrika Merchant",
        avatar: "👔",
        personality: "Fast-talking bale hustler, calls everybody Chairman or Boss, loves hyperbole",
        basePatience: 100,
        patienceLossPerOffer: 12,
        insultToleranceRatio: 0.65,
        callbackChance: 0.75,
        dialogue: {
          greetings: [
            "Chairman! My personal person! Enter here, I get your exact taste!",
            "Boss! See pure London-used first-grade stock, no be that fake one dem dey sell for roadside!",
            "Customer of life! You don reach proper shop today. What can I pack for you?"
          ],
          insults: [
            "Chineke God! Which kind bad morning be this?! You wan close my shop today?!",
            "Commot for my front! I be your age mate? You think say na dustbin I pick this good thing from?!",
            "Thunder fire this your price! Go buy am for refuse dump if you no get money!",
            "Ah ah! Oga, you dey whine me? Even the nylon bag cost pass this your price!"
          ],
          grumblingCounter: [
            "Haba chairman, you wan kill person? Even me wey carry am from wharf, I no buy am that price. Drop {counter} make we talk.",
            "Abeg reason with me. Dollar don rise o! Last price na {counter}, I no fit go lower pass that.",
            "Look the quality well well! Check the grade yourself! Last last, bring {counter}.",
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
      {
        id: "sister_blessing",
        name: "Sister Blessing",
        title: "Vintage Thrift Princess",
        avatar: "🥻",
        personality: "Sassy Yaba boutique stylist, calls customers 'Baby boy' or 'Sweetheart', very sharp on vintage labels",
        basePatience: 105,
        patienceLossPerOffer: 11,
        insultToleranceRatio: 0.62,
        callbackChance: 0.80,
        dialogue: {
          greetings: [
            "Baby boy! See as you fresh! Step inside my stall, I get what will fit your lifestyle!",
            "Sweetheart! Don't pass by like that! I get authentic UK vintage first-grade bale!",
            "Fine customer! My shop no be ordinary okrika, na curated boutique drip!"
          ],
          insults: [
            "Jesus is Lord! Baby boy, with all this your fine face, this na the dry price you dey call?!",
            "Ah ah, sweetheart! You wan make I go sleep for street? God forbid that price!",
            "Dey play! Even pure water sachet cost pass this your offer, no shame?!"
          ],
          grumblingCounter: [
            "Baby boy, you tight hand too much! Cargo freight from London killed my profit. Pay {counter}.",
            "Sweetheart, abeg have pity on a working girl! The lowest I can drop is {counter}.",
            "Quality speaks for itself, fine customer! Settle for {counter} make we shake hands."
          ],
          softenedCounter: [
            "Aww, because you smile fine and I like your aura, take am for {counter}.",
            "I won't stress you, baby boy. Drop {counter} make I fold am nicely inside bag.",
            "You know how to talk to woman. Pay {counter} and carry the drip go."
          ],
          acceptedDeal: [
            "It's a deal, handsome! Make sure you tag me on Instagram when you rock am!",
            "You beat my price down well well, but Sister Blessing loves your vibe. Take am!",
            "Sold! When your friends ask where you buy am, tell dem na Sister Blessing for Yaba!"
          ],
          walkAwayCallback: [
            "Baby boy wait na! Where you dey waka go for hot sun?! Come back, take am for {counter}!",
            "Sweetheart! Don't break my heart! Oya come, make we close deal at {counter}!",
            "Ah ah! You dey waka leave me?! Wait, talk your genuine mind!"
          ],
          walkAwayLost: [
            "Waka go jare, handsome! You go search whole Tejuosho before you see this cut!",
            "Bye bye sweetheart! Don't say Sister Blessing didn't warn you!",
            "Mcheww, see fine boy with tight pocket. Shift!"
          ],
          outOfPatience: [
            "My dear, patience don finish! Shift commot, go meet roadside sellers!",
            "I no fit continue this grammar! Carry your shoulder go another shop!",
            "Baby boy, you don exhaust my bandwidth. Move along!"
          ]
        }
      },
      {
        id: "oga_segun",
        name: "Oga Segun",
        title: "Tejuosho Sneaker & Kicks Plug",
        avatar: "🧢",
        personality: "Streetwise sneakerhead and streetwear broker, speaks crisp slang, prides himself on soles and stitching",
        basePatience: 95,
        patienceLossPerOffer: 13,
        insultToleranceRatio: 0.68,
        callbackChance: 0.72,
        dialogue: {
          greetings: [
            "General! Look your drip, you need that clean upgrade! Step inside, verified stock only!",
            "Padi mi! No be carton junk we dey sell here o. Grade-1 quality, test the weight!",
            "Odogwu streetwear! I get that exact item you dey find. Check this out!"
          ],
          insults: [
            "Chai! General, you dey whine me?! Even the packaging box alone cost pass your offer!",
            "Bros, dey play! Which kind gutter valuation be this? Go buy slippers for under bridge!",
            "Are you for real?! You wan buy high-heat drip with biscuit money?!"
          ],
          grumblingCounter: [
            "Padi mi, dollar rate for importation is choking us. Bottom line na {counter}.",
            "Check the finishing well well! Zero flaw. Last last, drop {counter}.",
            "I no dey chop excess margin here. Pay {counter} make you carry am bounce."
          ],
          softenedCounter: [
            "Alright General, because you understand street culture, take am for {counter}.",
            "Sharp guy! You know value. Drop {counter} make I give you free bonus item.",
            "Oya no long cap. Transfer {counter} make we wrap am."
          ],
          acceptedDeal: [
            "Deal sealed! Rock am with confidence, pure street respect guaranteed!",
            "You be master negotiator, General! Product don land in safe hands.",
            "Bagged! When boys hail you for street, mention Oga Segun!"
          ],
          walkAwayCallback: [
            "General! Hold on! Where you dey sprint go?! Come back, pay {counter} make we seal am!",
            "Padi mi! Don't sleep on this drip! Oya take am for {counter}!",
            "Bros wait! Tejuosho sun hot o, don't waka empty-handed. Come settle!"
          ],
          walkAwayLost: [
            "Waka bounce, my guy! Go buy that cheap knockoff for bus stop make e peel off!",
            "Cool story, General. Another buyer dey behind you with transfer ready!",
            "Shift make real ballers enter shop!"
          ],
          outOfPatience: [
            "Bros, my patience timer don ring! Market closed for you today!",
            "I get orders to dispatch for Lekki. No time for child play!",
            "General, exit stage left! You dey block shop light!"
          ]
        }
      }
    ],
    get seller() {
      return this.sellers[0];
    },
    items: [
      {
        id: "vintage_jacket",
        name: "Vintage London Oversized Denim",
        desc: "Grade-1 Okrika from UK bale. Heavyweight cotton, washed once, smells like vintage thrift.",
        askingPrice: 28000,
        floorPrice: 9000,
        marketFairPrice: 13000,
        icon: "🧥",
        isOriginal: false,
        authBadgeText: "GRADE-1 UK THRIFT / VINTAGE BALE",
        dialogue: {
          greetings: [
            "Chairman! Check this vintage London denim jacket! Heavy cotton, oversized drop-shoulder cut. What do you think?",
            "Boss! Proper UK bale denim jacket, washed and ready to rock! Lift am feel the heavyweight denim!"
          ],
          playerOfferLines: [
            "Bros, collar don fade small from bale wash. I fit pay {offer} for this denim jacket.",
            "Oga, this jacket hem get small loose thread. Take {offer} cash make I carry am.",
            "Chairman, I dey drop {offer} for this oversized denim jacket, no time waster.",
            "Senior man, release this vintage denim for {offer} make I bless your stall."
          ],
          grumblingCounter: [
            "Haba chairman! Heavy denim from UK container no be light roadside shirt! Drop {counter}.",
            "That wash fade na authentic vintage stone-wash from London! Bottom price na {counter}.",
            "Cargo freight from Heathrow port cost heavy money. Bring {counter} make we talk."
          ],
          softenedCounter: [
            "Because this jacket go fit your shoulder well well, take am for {counter}.",
            "I like your style, bros. Drop {counter} make you carry this jacket slay.",
            "Pay {counter} make I fold this London denim neatly inside nylon."
          ],
          insults: [
            "Chineke God! You wan buy heavyweight London denim jacket with sachet water money?!",
            "Dey play! Go buy rags for roadside if this na your budget for vintage denim!",
            "You think say na dustbin dem pick this denim jacket from? Comot here!"
          ],
          acceptedDeal: [
            "Deal! Rock this denim jacket with white tee and fresh kicks! You go stand out!",
            "You squeeze my profit on this jacket, but carry am go! Pure vintage quality!",
            "Sold! Bros Emeka don bless your wardrobe with London denim!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't leave this London denim jacket! Come pay {counter}!",
            "Boss wait na! You no go find this heavy stone-wash cut anywhere in Yaba! Take {counter}!",
            "Hold on bros! Settle this vintage denim for {counter} make we shake hands!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that light paper jacket for roadside wey go tear next week!",
            "Safe journey! Nobody in Tejuosho get this wash of denim!",
            "Shift make real fashion guys inspect the jacket!"
          ],
          playerWalkAway: "This denim jacket cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, inspect this denim jacket collar and hem seam! The collar wash don fade and hem get loose thread!",
              successText: "Ah ah, small vintage fade on collar na him you spot? Oya no wahala, I drop am to {counter}.",
              backfireText: "God forbid! You dey call authentic UK stone-wash denim fade dirty?! Price don climb to {counter}!",
              failText: "Commot for here! Na intentional vintage distress, no be fault! Shift!"
            },
            sweet_talk: {
              playerText: "Chairman! Your boutique stall get the sweetest vintage jackets in Tejuosho! Dash a brother good discount.",
              sellerResponse: "Haha! You know drip when you see am! Because you hail me, I cool down for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the rail boys for down track dey sell this same denim jacket for cheap? I dey come...",
              sellerResponse: "Those railway boys dey sell soaked grade-3 thrift! Don't leave, take this clean jacket for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* See crisp cash for hand. Take am for this denim jacket now now or I waka!",
              agreedResponse: "Oya bring the cash! Denim jacket is yours, pure vintage blessing!",
              rejectResponse: "Keep your cash for pocket! London denim no be roadside giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "seam_check",
            label: "🔍 Point Out Collar Wash Fade",
            playerText: "Bros, collar don fade small from bale wash, plus hem get loose thread! Drop am to {price}.",
            discountPct: 0.45,
            sellerResponse: "Haba! That fade na authentic vintage stone-wash from London! But no wahala, I fit reason {counter}."
          },
          {
            id: "rail_rival",
            label: "🚆 Tejuosho Rail Boys Cheaper",
            playerText: "Under-bridge boys down the railway line dey sell this exact denim for ₦13,000!",
            discountPct: 0.35,
            sellerResponse: "Those railway boys dey sell soaked grade-3 thrift! You want jacket wey go tear next week?! Anyway, take {counter}."
          },
          {
            id: "cash_ready",
            label: "💵 Slap Cash On Table",
            playerText: "I hold clean cash for hand right now, no transfer delay. Release am for {price} make I carry am.",
            discountPct: 0.55,
            sellerResponse: "Oya bring the cash quick make market open for me! Settle at {counter}."
          }
        ]
      },
      {
        id: "levis_selvedge",
        name: "Original 1990s Levi's 501 Selvedge",
        desc: "Genuine heavyweight Sanforized denim with authentic Red Tab. Rare collector specimen.",
        askingPrice: 55000,
        floorPrice: 22000,
        marketFairPrice: 32000,
        icon: "👖",
        isOriginal: true,
        authBadgeText: "★ AUTHENTIC 1990s RED TAB SELVEDGE",
        dialogue: {
          greetings: [
            "Boss! Rare collector specimen: Genuine 1990s Sanforized Levi's 501 with Red Tab! How you see am?",
            "Customer of life! Check the red line selvedge ID inside the cuff! Pure deadstock vintage!"
          ],
          playerOfferLines: [
            "Oga, even for collector jeans, 1990s denim still be second-hand. I go pay {offer}.",
            "Chairman, see {offer} transfer ready for this Levi's 501 selvedge.",
            "Bros, drop this 501 to {offer} make I take am straight to my wardrobe.",
            "I hold {offer} clean cash for this vintage jeans, take am make we close."
          ],
          grumblingCounter: [
            "Haba! This red tab selvedge na pure gold for Tokyo and London vintage shops! Bottom price na {counter}.",
            "Sanforized heavyweight denim wey last 30 years without tears! Last last, bring {counter}.",
            "You dey price collector piece like regular jeans! Lowest I fit drop na {counter}."
          ],
          softenedCounter: [
            "Because you appreciate true vintage selvedge, take am for {counter}.",
            "I like person wey know denim history. Pay {counter} make you carry am.",
            "Drop {counter} make I give you original Levi's copper button guarantee."
          ],
          insults: [
            "Tufiakwa! You wan buy 1990s original Levi's 501 selvedge with chin-chin money?!",
            "Holy Ghost! Disrespecting rare vintage denim with this kind insult price?! Shift!",
            "Go buy polyester trousers for market gate if this na your budget!"
          ],
          acceptedDeal: [
            "Sold to a true denim collector! Don't wash am with hot water, maintain the selvedge!",
            "Deal sealed! This 501 jeans go outlive both of us! Wear am with pride!",
            "Receipt stamped! Original Levi's Red Tab don enter your hands!"
          ],
          walkAwayCallback: [
            "Hold on, collector! You no go see another genuine 1990s Red Tab selvedge in all of Lagos! Pay {counter}!",
            "Customer wait! Let us settle this selvedge denim for {counter}!",
            "Don't walk away from rare vintage gold! Come take am for {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Next vintage collector go buy am before sunset!",
            "Bye bye! Real selvedge denim no dey drop on roadside!",
            "Shift make real connoisseurs inspect the weave!"
          ],
          playerWalkAway: "This Levi's 501 selvedge cost pass my power. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, check the button fly and back leather patch! You sure say this patch stitching never re-sewn?",
              successText: "Ah, you notice the aged patina on the rivet? Oya no wahala, I drop am to {counter}.",
              backfireText: "God forbid! You dey insult genuine 1990s Sanforized Levi's Red Tab?! Price don climb to {counter}!",
              failText: "Commot for here! Original factory stitch unbroken since 1994! Stop finding fake fault!"
            },
            sweet_talk: {
              playerText: "Oga master! Only true fashion plug fit stock this kind pristine 501 selvedge! Give a connoisseur good price.",
              sellerResponse: "You be man of culture! You know quality! I go treat you well!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the boutique for Ikeja get deadstock selvedge 501 for better price? I dey come...",
              sellerResponse: "Ikeja boutique go charge you triple for fake! Stay here, take this original for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on table)* Crisp cash right now for this Levi's 501 selvedge. Take am or I waka!",
              agreedResponse: "Slap the cash down! True collector denim belongs to you!",
              rejectResponse: "Pocket that cash! Rare red tab selvedge no be distress sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "vintage_collector",
            label: "🏷️ Red Tab Collector Knowledge",
            playerText: "I be vintage collector, I know this 501 batch well. Give me collector wholesale price at {price}.",
            discountPct: 0.40,
            sellerResponse: "You know good things! This red tab na pure gold. Because you appreciate quality, take am for {counter}."
          },
          {
            id: "cash_transfer",
            label: "📱 Instant Bank Transfer",
            playerText: "See my banking app open, no story. Confirm alert in 5 seconds if you agree to {price}.",
            discountPct: 0.50,
            sellerResponse: "Alert na my best friend! Squeeze small money add on top, pay {counter} make you carry am."
          },
          {
            id: "walkout_feint",
            label: "🚶 Threaten Boutique Walkout",
            playerText: "If you no gree {price}, boutique for Ikeja get deadstock denim waiting for me.",
            discountPct: 0.35,
            sellerResponse: "Wait now! Ikeja boutique go charge you double! Take am for {counter} make you save money."
          }
        ]
      },
      {
        id: "dior_sneakers",
        name: "Dior B23 'Original Replica' Sneakers",
        desc: "Direct from Vietnam. Seller claims 'even Dior CEO cannot spot the difference'. Translucent upper, vulcanized sole.",
        askingPrice: 45000,
        floorPrice: 16000,
        marketFairPrice: 22000,
        icon: "👟",
        isOriginal: false,
        authBadgeText: "GRADE-1 VIETNAM SNEAKER REPLICA",
        dialogue: {
          greetings: [
            "Fine boy! Dior B23 sneakers direct from Vietnam! Even Dior CEO no fit tell the difference! Check am!",
            "Boss! Translucent panel, oblique print, pristine vulcanized rubber sole! What is your shoe size?"
          ],
          playerOfferLines: [
            "Bros, look the rubber sole edge, industrial glue smell still dey! I go pay {offer} for this sneaker.",
            "Oga, everybody know say Vietnam replica cost ₦18k max. I dey drop {offer}.",
            "Senior man, take {offer} cash for this Dior kicks make I lace am commot.",
            "I hold {offer} cash for this footwear right now, make we seal am."
          ],
          grumblingCounter: [
            "Haba boss, look the oblique print alignment! Grade-1 finishing no be cheap! Drop {counter}.",
            "Air cargo freight from Hanoi killed my margin. Bottom price na {counter}.",
            "Touch the vulcanized rubber sole na! Solid weight. Last price na {counter}."
          ],
          softenedCounter: [
            "Because you get fresh swag and shoe fit your foot, take am for {counter}.",
            "Drop {counter} make I give you extra laces and branded dust bag free.",
            "Oya pay {counter} make you step out fresh for weekend party."
          ],
          insults: [
            "Ah ah! You wan wear luxury Dior high-top kicks with pure water money?! Dey play!",
            "Comot for my front! Even the shoebox alone cost pass this your dry offer!",
            "Go buy rubber bathroom slippers for roadside if this na your budget!"
          ],
          acceptedDeal: [
            "Deal! Step out with confidence, nobody go know say na Vietnam replica! Fresh boy!",
            "Money collected, kicks delivered! Walk like boss for Lekki!",
            "Sold! Don't drag the heel on rough tar, maintain your clean drip!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't walk away from fresh kicks! Come, take am for {counter}!",
            "Fine boy hold on! Let us settle this Dior sneakers at {counter}!",
            "Bros wait! Your size scarce for market o! Come take am for {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that cheap rubber shoe for bridge wey go peel sole tomorrow!",
            "Safe journey! Nobody in Yaba get this clean oblique print!",
            "Shift make serious ballers try the sneakers!"
          ],
          playerWalkAway: "This Dior sneaker cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, inspect the sole glue marks and heel tab! The industrial glue line uneven and rubber smell strong!",
              successText: "Chai, your eye sharp like needle! Okay, because you catch the finishing mark, drop {counter}.",
              backfireText: "God forbid! You dey insult grade-1 master replica?! Price don enter {counter}!",
              failText: "Clean mold straight from factory, which glue you dey invent?! Shift!"
            },
            sweet_talk: {
              playerText: "Big boss! Your sneaker collection na number one in Tejuosho! Bless my step with good price.",
              sellerResponse: "Aww, fine boy with swag! Because you hail me, I slash the price for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the sneaker vendor under Ojuelegba bridge get this exact B23 cheaper? I dey come...",
              sellerResponse: "Ojuelegba bridge kicks go dissolve inside rain! Stay here, take this grade-1 for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Raw cash in hand for this Dior sneakers. Take am now now or I waka!",
              agreedResponse: "Bring the cash quick! Pack the Dior kicks inside dust bag for customer!",
              rejectResponse: "Keep your cash! Grade-1 kicks no be gala money!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "glue_mark",
            label: "🔍 Inspect Sole Glue Marks",
            playerText: "Look the sole edge, industrial glue smell still dey! This one na replica, slash am to {price}.",
            discountPct: 0.48,
            sellerResponse: "Chai, your eye sharp like needle! Okay, because you catch the finishing, drop {counter}."
          },
          {
            id: "bulk_shopper",
            label: "👟 Promise Return for Kicks",
            playerText: "Sell this one for {price}, next week I dey bring my 3 cousins come buy their own.",
            discountPct: 0.38,
            sellerResponse: "I like customer wey dey bring crowd! Oya pay {counter} make you bring the boys!"
          },
          {
            id: "street_value",
            label: "💰 Quote Real Street Worth",
            playerText: "Everybody for Yaba know Vietnam clone cost ₦18k max. Let's do {price} and close deal.",
            discountPct: 0.52,
            sellerResponse: "You wicked for negotiation o! Okay take am for {counter}, no tell anybody this price!"
          }
        ]
      },
      {
        id: "gucci_shades",
        name: "Retro Tinted Sunglasses",
        desc: "UV protection not guaranteed, but 100% maximum street respect. Gold-plated metal frame, gradient tint.",
        askingPrice: 15000,
        floorPrice: 4500,
        marketFairPrice: 7000,
        icon: "🕶️",
        isOriginal: false,
        authBadgeText: "STREET DRIP RETRO EYEWEAR",
        dialogue: {
          greetings: [
            "Customer! Retro tinted sunglasses for maximum street swagger! Try am on your face!",
            "Boss! UV fashion shades with gold frame accent! Look in the mirror, see as you fresh!"
          ],
          playerOfferLines: [
            "Oga, this plastic lens no get UV400 polarization. I go pay {offer} for am.",
            "Na ordinary fashion accessory for sun. Take {offer} cash make I carry am.",
            "Bros, release this shades for {offer} make I add am to my drip.",
            "I hold {offer} clean cash for this retro glasses, wrap am quick."
          ],
          grumblingCounter: [
            "Haba chairman! Gold-tint frame and gradient lens! Bottom price na {counter}.",
            "Fashion sunglasses wey go elevate your entire outfit! Last price na {counter}.",
            "Drop {counter} make I add hard leather case join am."
          ],
          softenedCounter: [
            "Because the shades fit your cheekbones well well, take am for {counter}.",
            "Oya pay {counter} make you shine under Lagos sun today.",
            "Drop {counter} make you look like music video star."
          ],
          insults: [
            "Dey play! You wan buy celebrity retro shades with toothpick change?!",
            "Shift commot! Go wear cardboard glass if this na your pocket!",
            "Even the velvet pouch cost pass this your price!"
          ],
          acceptedDeal: [
            "Sold! Put am on your face immediately, paparazzi go think say you be superstar!",
            "Deal closed! Enjoy your drip under hot Lagos sun!",
            "Wiped clean and bagged! Rock your shades with swag!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't enter the bright sun without your shades! Take am for {counter}!",
            "Chairman hold on! Oya come take the shades for {counter}!",
            "Boss wait! Settle the glasses at {counter} make we shake hands!"
          ],
          walkAwayLost: [
            "Waka go! Go squint your eyes inside sun outside!",
            "Bye bye! Real gold-tint frames scarce for street!",
            "Shift make people with eye for drip enter!"
          ],
          playerWalkAway: "This sunglasses cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, check the hinge screw and lens coating! The hinge wobble small and lens no get UV polarization!",
              successText: "Ah, you spot the small hinge play? No wahala, I tighten am with screw and drop price to {counter}.",
              backfireText: "God forbid! You dey claim luxury styling shades get fault?! Price na {counter} now!",
              failText: "Firm hinge and scratch-free lens, which wobble you dey invent?! Shift!"
            },
            sweet_talk: {
              playerText: "Chairman! You be number one eyewear plug for Yaba! Hook up your boy with sharp price.",
              sellerResponse: "Haha! Odogwu customer! Because you hail me, I cool down for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the hawker by Tejuosho ultra-modern gate get this same shades cheaper? I dey come...",
              sellerResponse: "Hawker shades go break on your nose in 10 minutes! Take this firm frame for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Crisp cash right now for this sunglasses. Take am or I waka!",
              agreedResponse: "Slap the cash down! Wipe the lens with cloth, take am go!",
              rejectResponse: "Pocket your cash! Celebrity eyewear no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "uv_test",
            label: "☀️ Call Out Non-Polarized Lens",
            playerText: "This plastic lens no get UV400 coating o! Eye go still pain me. Leave am for {price}.",
            discountPct: 0.45,
            sellerResponse: "Na fashion shades we dey talk, no be welding glass! Take am for {counter} make you look fresh."
          },
          {
            id: "combo_pack",
            label: "📦 Add As Stall Accessory",
            playerText: "Na small accessory I dey add to my drip. Dash me for {price} make I bless your stall.",
            discountPct: 0.55,
            sellerResponse: "You wan collect giveaway! Drop {counter} make I give you free pouch join am."
          },
          {
            id: "street_swagger",
            label: "😎 Flatter Street Swagger",
            playerText: "Chairman, I need this to complete my Lagos boss look today. Settle me at {price}.",
            discountPct: 0.35,
            sellerResponse: "Odogwu swag! E fit your face die! Oya bring {counter} make you shine."
          }
        ]
      }
    ]
  },
  {
    id: "balogun",
    name: "Balogun Island Market",
    tagline: "High Stakes Fabrics, Lace & Traditional Splendor",
    bgGradient: "from-emerald-900 to-teal-950",
    sellers: [
      {
        id: "mama_nkechi",
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
            "My fine daughter / handsome son! Come and look at real luxury fabrics!",
            "Ah! See as your skin dey glow! You need quality material for your next owanbe!",
            "Welcome o! May God bless your pocket as you enter Mama Nkechi's stall!"
          ],
          insults: [
            "Mbanu! God forbid! Is it because I am smiling that you want to insult my ancestors?!",
            "Holy Ghost fire! Look at this child o! Do you think I picked this fabric from gutter?!",
            "Blood of Zechariah! Did your mother send you to punish me today?!",
            "Tufiakwa! Don't call that cursed price inside my shop again!"
          ],
          grumblingCounter: [
            "My pikin, you want to kill an old woman? I have school fees to pay o. Pay {counter}.",
            "Haba! Have the fear of God small! Even the shipping from Europe was huge. Bring {counter}.",
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
      {
        id: "alhaja_kudirat",
        name: "Alhaja Kudirat",
        title: "Lace & Gele Matriarch",
        avatar: "👑",
        personality: "Commanding Lagos Island socialite, gold teeth and heavy jewelry, deals with high society Owanbe party lace",
        basePatience: 105,
        patienceLossPerOffer: 14,
        insultToleranceRatio: 0.66,
        callbackChance: 0.78,
        dialogue: {
          greetings: [
            "E kaabo o! Fine pikin of wealthy parents! Step into Alhaja's palace of pure luxury!",
            "Ah, look at this fine face! You are heading to high-society wedding, come inspect original Austrian embroidery!",
            "Oko mi / Iyawo mi! Genuine European voile and metallic textiles direct from source!"
          ],
          insults: [
            "Egbami o! Are you abusing my father's lineage with this kind chicken change?!",
            "Mo gbe! Look at this child pricing luxury goods like bitterleaf for night market!",
            "Ta lo ran e wa?! (Who sent you to torment me?!) Take that your cursed price go front!"
          ],
          grumblingCounter: [
            "Haba, my child! Even customs clearance at Apapa port cost more than that. Drop {counter}.",
            "You want to skin Alhaja alive! Because I like your composure, last price is {counter}.",
            "See pure gold thread inside the border! Pay {counter} make you go slay for party."
          ],
          softenedCounter: [
            "Oya o, my child with home training. Alhaja will dash you grace: bring {counter}.",
            "You know how to respect elders. Pay {counter} make I give you free wrapper bag.",
            "Alhaja smiles on you today. Pay {counter} and go with prayers."
          ],
          acceptedDeal: [
            "Ase! May you wear this fabric to dance, celebrate and carry twins! Sold!",
            "Sharp child! You negotiated like Lagos Island elder. Take am!",
            "Alhaja blesses your purse! When party pictures come out, tag me!"
          ],
          walkAwayCallback: [
            "Wait, my fine child! Don't walk into Lagos Island heat! Come back, take am for {counter}!",
            "Ah ah, you are turning back?! Alhaja never lets good customer leave! Come take {counter}!",
            "Oya come back here! Stop making drama on the street! Bring {counter}!"
          ],
          walkAwayLost: [
            "Waka lo! May you go and buy polyester that will itch you at the party!",
            "Go test your luck with those roadside impostors, you will return crying!",
            "Shooo! Fine things are not for people without cash. Next!"
          ],
          outOfPatience: [
            "My head is drumming! Leave Alhaja's stall before my boys escort you out!",
            "I have chieftaincy committee to attend, no time for juvenile jokes! Shift!",
            "Shop is closed for you! Oya fiyen le!"
          ]
        }
      },
      {
        id: "madam_peace",
        name: "Madam Peace",
        title: "Balogun Silk & Brocade Plug",
        avatar: "🧣",
        personality: "Sharp, brisk, no-nonsense merchant, counts her yards precisely with wooden yardstick",
        basePatience: 95,
        patienceLossPerOffer: 16,
        insultToleranceRatio: 0.72,
        callbackChance: 0.70,
        dialogue: {
          greetings: [
            "Enter quick, customer! Pure imported luxury textiles, no time wasting!",
            "Sharp business here! Touch the weight, pure Milan fabric that shines under sun!",
            "Welcome! If you want genuine quality without middleman cut, you dey right place!"
          ],
          insults: [
            "Chai! Are you insulting European weavers or you think this na nylon fishing net?!",
            "Oga, commot! Don't come and disgrace yourself inside my boutique!",
            "Tufia! That money cannot even buy the wooden yardstick I dey hold!"
          ],
          grumblingCounter: [
            "Customer, pure Euro exchange rate killed importation. Last price na {counter}.",
            "I measure full 36 inches per yard, no short yardage here! Drop {counter}.",
            "This quality sells itself for Lekki boutiques at double. Pay {counter}."
          ],
          softenedCounter: [
            "Alright, because you know what you want without stress, take am for {counter}.",
            "Pay {counter} make I roll am on cardboard tube for you.",
            "Transfer {counter} right now and we shake hands."
          ],
          acceptedDeal: [
            "Measured, cut and packed! Receipt inside bag. Enjoy your fabric!",
            "Done! You drive hard bargain, but Madam Peace respects decisive customer!",
            "Sold! Send pictures when your tailor finishes the design!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't leave pure imported quality on table! Come take {counter}!",
            "Oga hold on! Let's close am at {counter} before rain starts!",
            "Wait! Don't go buy blended polyester down the road! Bring {counter}!"
          ],
          walkAwayLost: [
            "Waka pass! You will search whole Lagos Island and return here!",
            "Bye bye! Real weavers don't do charity!",
            "Next customer please!"
          ],
          outOfPatience: [
            "Time is money! I have wholesale bales to cut, shift commot!",
            "Patience zero! Move along!",
            "Stop wasting my business hours!"
          ]
        }
      }
    ],
    get seller() {
      return this.sellers[0];
    },
    items: [
      {
        id: "swiss_lace",
        name: "5 Yards Pure Austrian Swiss Voile Lace",
        desc: "Heavyweight 100% cotton voile embroidery with Swarovski crystal stones. The crown jewel of Owanbe parties.",
        askingPrice: 85000,
        floorPrice: 38000,
        marketFairPrice: 52000,
        icon: "🧵",
        isOriginal: true,
        authBadgeText: "★ CERTIFIED ORIGINAL AUSTRIAN VOILE",
        dialogue: {
          greetings: [
            "My fine child! Come and touch pure Austrian Swiss voile lace! 5 yards of pure royal embroidery!",
            "Welcome to Balogun! Genuine imported lace from Vienna, no be Aba imitation! Look the weight!"
          ],
          playerOfferLines: [
            "Mama, I hold {offer} cash for this 5 yards Swiss lace. Bless your customer.",
            "Iya, customs clearance or no customs, my budget for this lace is {offer}.",
            "Ma, help a family member preparing for wedding introduction with {offer} on this lace.",
            "I dey pay {offer} cash for this Austrian lace, no delay."
          ],
          grumblingCounter: [
            "Haba my child! Euro exchange rate from Austria was high! The absolute least is {counter}.",
            "Touch the heavy cotton thread na! Pure stone work! Bring {counter} make mama cut am.",
            "You want to skin Mama alive on Austrian lace! Last price na {counter}."
          ],
          softenedCounter: [
            "Because you have home training and you respect an elder, take am for {counter}.",
            "I will bless you with this lace for your owanbe. Drop {counter}.",
            "Pay {counter} make you carry this Austrian blessing go."
          ],
          insults: [
            "Mbanu! Holy Ghost fire! Do you think I picked this Austrian lace from gutter with this dry offer?!",
            "Tufiakwa! You want to buy pure 5 yards Swiss lace with bitterleaf money?!",
            "Look at this child pricing Austrian crystal lace like rag! God forbid!"
          ],
          acceptedDeal: [
            "God bless your home! When you wear this lace to dance, all eyes go look you! Sold!",
            "Deal! Tell everybody at the party that Mama Nkechi cuts the purest Austrian lace!",
            "Ase! May this fabric bring joy, celebration and long life to your family!"
          ],
          walkAwayCallback: [
            "My child wait! Don't enter that Lagos Island sun! Come back, take this lace for {counter}!",
            "Stop, my pikin! Mama will drop the lace to {counter} for your wedding!",
            "Wait! Don't break Mama's heart! Come take Austrian lace for {counter}!"
          ],
          walkAwayLost: [
            "Go in peace! May you go and buy polyester that will tear on the dance floor!",
            "Safe journey! Nobody in Balogun get this Vienna batch!",
            "Waka go! Better party celebrants dey come!"
          ],
          playerWalkAway: "This Swiss lace cost pass my budget abeg Mama. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Mama, let me inspect the border eyelets and stone work! You sure say no stones fell off inside bale?",
              successText: "Ah, one small bead loose at the tail edge? Oya no problem, I drop am to {counter}.",
              backfireText: "Tufiakwa! You are looking for missing stone on certified Austrian voile lace?! The price is now {counter}!",
              failText: "Flawless Vienna embroidery! Don't bring bad eyes to my lace! Shift!"
            },
            sweet_talk: {
              playerText: "Mama of life! Your skin dey glow like Austrian silk! Bless your favorite child with discount.",
              sellerResponse: "Aww, my handsome child! You talk with home training! Mama will favor you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Aunty, you say that woman behind Balogun mosque has the exact same Swiss lace cheaper? I dey come...",
              sellerResponse: "That woman is selling synthetic nylon that will itch you! Come back, take this genuine lace for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* See cash for hand for this 5 yards Swiss lace. Take am now now or I waka!",
              agreedResponse: "Bring the cash, my child! Wrap the lace inside silk bag for them!",
              rejectResponse: "Keep that cash inside your purse! Austrian lace is not for joke!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "thread_count",
            label: "🔍 Scrutinize Cotton Eyelet Cutwork",
            playerText: "Mama, look this cutwork border, thread tension slightly loose! Drop am to {price} make I manage am.",
            discountPct: 0.45,
            sellerResponse: "Tufiakwa! Loose thread on Austrian lace?! That is hand-cut scalloped edge! But because you know embroidery, take {counter}."
          },
          {
            id: "wedding_asoebi",
            label: "👰 Promise 20-Person Aso-Ebi Order",
            playerText: "Mama, if you give me {price}, the entire 20-person bridal train go buy their wrapper from your stall!",
            discountPct: 0.52,
            sellerResponse: "Ah! 20 people bridal train?! God bless your union! Oya bring {counter} make we start with this one."
          },
          {
            id: "cash_slap_balogun",
            label: "💵 Slap Crisp ₦1000 Notes",
            playerText: "No bank app transfer network delay. Raw clean cash in hand right now at {price}.",
            discountPct: 0.40,
            sellerResponse: "Cash na king for Balogun! Count the money sharp sharp, take am for {counter}."
          }
        ]
      },
      {
        id: "royal_george",
        name: "Premium Intorica Royal George Wrapper",
        desc: "Authentic Madras-woven Indian George fabric with intricate gold metallic bullion zari border.",
        askingPrice: 120000,
        floorPrice: 58000,
        marketFairPrice: 78000,
        icon: "👘",
        isOriginal: true,
        authBadgeText: "★ ORIGINAL INTORICA GEORGE WRAPPER",
        dialogue: {
          greetings: [
            "Odogwu! Royal Intorica George wrapper for high-society traditional marriage! Check the gold bullion fringe!",
            "Customer! Pure Indian-origin Intorica George, heavyweight gold embroidery! Step inside!"
          ],
          playerOfferLines: [
            "Mama, I fit drop {offer} cash for this Intorica George wrapper.",
            "Oga, traditional marriage expenses choke me. Release this George for {offer}.",
            "I dey pay {offer} on the spot for this George fabric.",
            "Senior seller, let's close at {offer} for this traditional wrapper."
          ],
          grumblingCounter: [
            "Chai! Intorica George with pure metallic zari thread! Bottom price na {counter}.",
            "Imported direct from Madras weavers, zero counterfeit! Last price na {counter}.",
            "You want to buy traditional royalty wrapper with small change? Drop {counter}."
          ],
          softenedCounter: [
            "Because your family get big wedding, I leave this George for {counter}.",
            "Pay {counter} make you carry this royal blessing go.",
            "Drop {counter} make Mama fold the gold bullion edge with tissue paper."
          ],
          insults: [
            "God forbid! You dey price Intorica George like ordinary bedsheet?!",
            "Commot for here! Royal wrapper no be for empty pockets!",
            "Do you think royal chiefs buy this with pocket change?! Shift!"
          ],
          acceptedDeal: [
            "Done deal! Tie this George wrapper for your waist, whole village go bow! Sold!",
            "Royal blessings upon your marriage! Carry your Intorica George go!",
            "Ase! May your traditional union bring endless wealth! Wrapper is yours!"
          ],
          walkAwayCallback: [
            "Wait customer! Don't buy fake polyester George outside! Come, take this original for {counter}!",
            "Odogwu wait! Come back take the George wrapper for {counter}!",
            "Stop there! Let's settle royal George at {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that plastic wrapper wey go melt under iron!",
            "Safe journey! Nobody in Lagos Island get this original Intorica stamp!",
            "Next customer please!"
          ],
          playerWalkAway: "This George wrapper cost pass my power. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, check this gold bullion fringe and wrapper border! The gold thread get loose loop!",
              successText: "Ah, small loop thread at the edge fringe? Oya take am for {counter}.",
              backfireText: "Tufiakwa! Disrespecting certified Intorica royal gold thread?! Price don reach {counter}!",
              failText: "Tight handwoven Indian zari thread, zero defect! Shift!"
            },
            sweet_talk: {
              playerText: "Alhaja / Mama! Nobody in Balogun has authentic George wrapper like you! Treat your loyal in-law well.",
              sellerResponse: "Haha! You know how to respect custom! Because you talk well, I slash the price!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the wrapper stall down Martins street get this same Intorica George for cheaper? I dey come...",
              sellerResponse: "Martins street boys dey sell Chinese nylon copy! Take this authentic Intorica for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Raw cash on table for this George wrapper. Take am now or I waka!",
              agreedResponse: "Slap the cash down! Fold the royal George neatly inside box!",
              rejectResponse: "Keep that small cash for pocket! Intorica George is for royalty!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "metallic_fringe",
            label: "✨ Test Bullion Zari Weight",
            playerText: "This gold border feel lighter than 1990s vintage Intorica batches! Fair valuation na {price}.",
            discountPct: 0.42,
            sellerResponse: "Pure Indian zari work never loses weight! But because you understand royal wrappers, take am for {counter}."
          },
          {
            id: "family_inlaw_plea",
            label: "👨‍👩‍👧 Traditional In-Law Introduction Plea",
            playerText: "Mama, my in-laws from Imo state are very strict on quality. Help a young groom with {price}.",
            discountPct: 0.48,
            sellerResponse: "Aww! In-laws must not disgrace our son! Mama will sponsor your marriage: pay {counter}!"
          },
          {
            id: "full_wrapper_set",
            label: "📦 Combo Request: Add Headtie Blouse",
            playerText: "I will pay {price} if you add matching embroidered blouse piece free.",
            discountPct: 0.38,
            sellerResponse: "You want to sweep Mama's store clean! Oya drop {counter} and carry the blouse lace join am."
          }
        ]
      },
      {
        id: "ankara_hollandis",
        name: "6 Yards Real Vlisco Hollandis Ankara",
        desc: "Certified Helmond-printed Dutch wax with signature crackle patterns. Indigo dyes that never bleed.",
        askingPrice: 65000,
        floorPrice: 28000,
        marketFairPrice: 38000,
        icon: "👗",
        isOriginal: true,
        authBadgeText: "★ CERTIFIED VLISCO HOLLANDIS WAX",
        dialogue: {
          greetings: [
            "Customer! 6 Yards real Vlisco Hollandis Ankara wax! Smell the authentic wax print aroma!",
            "Enter inside! Pure Helmond Holland wax, colors never fade even after 50 washes!"
          ],
          playerOfferLines: [
            "Mama, I fit drop {offer} for this 6 yards Hollandis wax.",
            "Iya, this print common small for market. Settle me at {offer}.",
            "I hold {offer} clean cash for this Ankara, let's close deal.",
            "Oga, {offer} cash ready for this Dutch wax."
          ],
          grumblingCounter: [
            "Haba! Genuine Dutch wax with registered serial stamp on selvedge! Bottom price na {counter}.",
            "This no be local chemical print wey go bleed inside washing machine! Last price na {counter}.",
            "Euro inflation on imported textiles is wicked. Bring {counter}."
          ],
          softenedCounter: [
            "Because you get good eye for classic Dutch patterns, take am for {counter}.",
            "Drop {counter} make I give you free matching lining thread.",
            "Pay {counter} make you look gorgeous for church on Sunday."
          ],
          insults: [
            "Mo gbe! You wan buy 6 yards pure Vlisco Hollandis with handkerchief money?!",
            "Dey play! Go buy nylon print for roadside if this na your budget!",
            "Look this person pricing original Dutch wax like sachet water! Tufia!"
          ],
          acceptedDeal: [
            "Sealed! Sew this Ankara into sharp agbada or stylish gown, you go turn heads! Sold!",
            "Deal! The colors will shine on your body forever! Enjoy your Vlisco wax!",
            "Sold! When people praise your outfit, tell dem you bought am from Balogun!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't buy that faded imitation outside! Come back, take this Hollandis for {counter}!",
            "Fine buyer wait! Come take your 6 yards Dutch wax for {counter}!",
            "Stop na! Let's close this Vlisco wax at {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that cheap wax wey go wash out turn white next Sunday!",
            "Safe trip! Real Dutch wax no dey roadside!",
            "Shift make real fashionistas buy!"
          ],
          playerWalkAway: "This Hollandis wax cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Mama, check the selvedge serial number and wax bleed! You sure say no printing smudge inside?",
              successText: "Ah, small wax stamp smudge on the border edge? Oya no wahala, I drop am to {counter}.",
              backfireText: "Holy Ghost fire! You dey doubt genuine Vlisco registered selvedge seal?! Price na {counter} now!",
              failText: "Flawless Dutch wax registration, zero smudge! Don't bring bad eyes!"
            },
            sweet_talk: {
              playerText: "Mama of Balogun! Your Ankara stall get the freshest Vlisco catalogs in Lagos! Bless a customer.",
              sellerResponse: "Aww, you have sweet tongue! Mama will treat you well!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the fabric shop by broad street get this exact Vlisco pattern cheaper? I dey come...",
              sellerResponse: "Broad street is selling China imitation wax! Stay here, take this genuine Hollandis for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Cash ready for hand for this 6 yards Ankara. Take am or I waka!",
              agreedResponse: "Slap the cash down! Wrap the 6 yards neatly inside bag!",
              rejectResponse: "Keep that change for pocket! Dutch wax no be roadside print!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "wax_crackle",
            label: "🔍 Verify Wax Crackle Texture & Stamp",
            playerText: "Let me check the selvedge serial stamp: 04632. Hollandis wax must have natural crackles, slash to {price}.",
            discountPct: 0.40,
            sellerResponse: "You be fabric professor! Check the selvedge yourself: 100% genuine Helmond. Take am for {counter}."
          },
          {
            id: "volume_buy",
            label: "👗 Buy 2 Full 6-Yard Bundles",
            playerText: "I go take this pattern plus the blue one behind you if you drop both to {price} each.",
            discountPct: 0.46,
            sellerResponse: "Ah, volume sale! Mama loves customer that buys multiple wrappers. Bring {counter} for each!"
          },
          {
            id: "counter_claim_aba",
            label: "⚠️ Claim Aba Imitation Flooding Market",
            playerText: "Aba market has flooded Lagos with ₦18k printed copies! Prove yours is Dutch by giving {price}.",
            discountPct: 0.50,
            sellerResponse: "Aba copy will wash out like chalk after one rain! Don't insult my store. But take am for {counter}."
          }
        ]
      },
      {
        id: "cashmere_wool",
        name: "4 Yards Italian Super 160s Cashmere Wool",
        desc: "Midnight navy suiting wool woven in Biella, Italy. Drape like liquid silk, wrinkle-resistant for boardroom moguls.",
        askingPrice: 95000,
        floorPrice: 42000,
        marketFairPrice: 58000,
        icon: "🧥",
        isOriginal: true,
        authBadgeText: "★ ITALIAN SUPER 160s CASHMERE WOOL",
        dialogue: {
          greetings: [
            "Distinguished gentleman / lady! 4 Yards of pure Italian Super 160s Cashmere Wool for bespoke suit! Touch the drape!",
            "Step inside! Milan imported suit fabric, soft like cloud, breathable under tropical weather!"
          ],
          playerOfferLines: [
            "Oga tailor, I fit pay {offer} for this 4 yards cashmere wool.",
            "I hold {offer} cash for this suit length, close the deal.",
            "Bros, tailoring cost alone is ₦50k. Subsidize this fabric at {offer}.",
            "Senior merchant, take {offer} for this Italian suiting length."
          ],
          grumblingCounter: [
            "Customer, Super 160s micron count from Biella, Italy! Bottom price na {counter}.",
            "This suit fabric will never wrinkle or shine under iron! Last price na {counter}.",
            "Air freight on luxury woolen textiles is crazy. Give me {counter}."
          ],
          softenedCounter: [
            "Because you look like corporate boardroom executive, take am for {counter}.",
            "Drop {counter} make you look sharp for your next high-stakes presentation.",
            "Pay {counter} and carry the finest Italian wool in Balogun."
          ],
          insults: [
            "Chai! You want to buy pure Italian Super 160s cashmere with secondary school uniform budget?!",
            "Shift commot! Go buy polyester suiting material if this na your cash!",
            "Do you know the cost of fine wool in Milan?! Don't mock luxury!"
          ],
          acceptedDeal: [
            "Deal! Take this wool to your master tailor, your three-piece suit will look like Savile Row!",
            "Sold! You squeezed my margin on Italian wool, but enjoy your luxury suit!",
            "Receipt signed! Super 160s cashmere wool is yours!"
          ],
          walkAwayCallback: [
            "Distinguished buyer wait! Don't go sew cheap polyester suit! Come back, take am for {counter}!",
            "Hold on sir! Let us close this Italian cashmere wool at {counter}!",
            "Wait! Don't compromise your corporate prestige! Come take {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go sew that hot plastic suit wey go bake you under sun!",
            "Safe journey! Real Biella wool scarce in this city!",
            "Next client please!"
          ],
          playerWalkAway: "This cashmere wool cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, let me check the selvedge woven lettering and weave density! The weave feel slightly loose!",
              successText: "Ah, you inspect weave density? Okay, because you understand suiting, I drop am to {counter}.",
              backfireText: "Tufia! You dey insult genuine Italian Biella cashmere wool weave?! Price don climb to {counter}!",
              failText: "Super 160s high-density weave, tight like drum! Shift!"
            },
            sweet_talk: {
              playerText: "Boss! You be the only merchant in Balogun wey understand international sartorial luxury! Favor my budget.",
              sellerResponse: "Haha! You understand bespoke menswear! Because you speak with class, I give you discount!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the textile boutique in Victoria Island get this same Italian wool cheaper? I dey come...",
              sellerResponse: "VI boutique will charge you triple plus VAT! Take this original length for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Cash on the counter for this 4 yards cashmere wool. Take am or I waka!",
              agreedResponse: "Slap the cash down! Fold the suit fabric in protective craft paper!",
              rejectResponse: "Keep that cash for pocket! Italian cashmere is not for distress sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "burn_test",
            label: "🔥 Request Flame/Ash Wool Purity Test",
            playerText: "Madam, cut a tiny strand make I burn am! If e burn with synthetic smell, na polyester. Settle for {price}.",
            discountPct: 0.44,
            sellerResponse: "Burn am with lighter! Pure white ash, smells like singed hair. 100% natural wool. Settle for {counter}."
          },
          {
            id: "tailor_margin",
            label: "✂️ Argue Bespoke Tailoring Labor Overhead",
            playerText: "My tailor for Lekki is charging ₦60k workmanship to cut this suit! Subsidize my budget at {price}.",
            discountPct: 0.38,
            sellerResponse: "Good suit needs good investment! Because I want you to look sharp like Governor, take am for {counter}."
          },
          {
            id: "cash_corporate",
            label: "💼 Corporate Expense Cash Payment",
            playerText: "Official corporate wardrobe budget in crisp cash right now at {price}.",
            discountPct: 0.48,
            sellerResponse: "Executive cash talks! Take receipt and carry the wool for {counter}."
          }
        ]
      }
    ]
  },
  {
    id: "computer_village",
    name: "Computer Village, Ikeja",
    tagline: "Otigba Street: Phones, Laptops & 'UK Used' Secrets",
    bgGradient: "from-blue-950 to-slate-950",
    sellers: [
      {
        id: "chidi_tech",
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
            "Big man! Otigba tech headquarters here! Verified clean UK-used gadgets only!",
            "Boss! Step inside, clean tested tech stock, zero iCloud lock, original follow-come parts!",
            "Senior man! Don't buy carton water for street o. Step inside, genuine gadgets with warranty!"
          ],
          insults: [
            "Bros, dey play! Even the charging accessories alone cost more than your offer!",
            "Are you joking or you want me to sell you dummy scrap from roadside?!",
            "Comot here, my guy! Go buy toy phone for roadside with this your budget!",
            "Guy, you dey whine me? This one na tested clean tech gadget o, no be faulty repair scrap!"
          ],
          grumblingCounter: [
            "Bros, clean spec, zero fault, tested working. Bottom line na {counter}.",
            "My guy, customs clearance alone at airport cargo terminal killed us. Last price na {counter}.",
            "I no dey chop profit on this unit at all. Give me {counter} make you carry am.",
            "Oga, I give you replacement warranty on top. Pay {counter} make we wrap am."
          ],
          softenedCounter: [
            "Alright boss, because you understand tech specs, I go leave am for {counter}.",
            "Sharp guy! You know market price. Drop {counter} and take free protective accessory.",
            "Oya, transfer {counter} right now and we call it done."
          ],
          acceptedDeal: [
            "Done deal! Bring money, test everything thoroughly before you step out!",
            "Sharp negotiation, chairman! You beat me down, but business is business.",
            "Collect am! Make you give my contact number to your guys in office!"
          ],
          walkAwayCallback: [
            "Guy! Wait! Where you dey go?! Oya hold on! What is your final transfer budget?!",
            "Chairman, don't walk away from tested clean device! Come, pay {counter}!",
            "Oga wait! Na clean tested grade o! Come back take am for {counter}!"
          ],
          walkAwayLost: [
            "Waka pass, bros! Go test that cheap one down the street make screen or chip die tomorrow!",
            "You will be back! Only Chidi Tech has clean motherboard units in this whole Ikeja!",
            "Cool story, bros. Shift make better customer buy."
          ],
          outOfPatience: [
            "Guy, battery of my patience don reach 1%! Go charge your money before you come back!",
            "I have laptops to flash and screens to swap. No time for child's play!",
            "Market closed for you, chief. Move along!"
          ]
        }
      },
      {
        id: "stanley_chips",
        name: "Stanley Chips",
        title: "Otigba Mac & Laptop Whiz",
        avatar: "💻",
        personality: "Fast-talking computer repairer and hardware engineer, talks specs, cycle counts and thermal paste",
        basePatience: 105,
        patienceLossPerOffer: 12,
        insultToleranceRatio: 0.70,
        callbackChance: 0.75,
        dialogue: {
          greetings: [
            "Bossman! You need machine with clean motherboard and zero bypass? Step inside!",
            "Programmer / Creative! Check this clean cycle count, SSD read speed 3000MB/s!",
            "Otigba logic-board guru! No refurbished junk here, follow-come parts only!"
          ],
          insults: [
            "Bros, dey play! High-speed RAM chips alone cost pass your whole price!",
            "Guy! You wan buy premium computing hardware with calculator budget? Tufiakwa!",
            "Shift commot! Go Otigba bridge go buy scrap if this na your pocket!"
          ],
          grumblingCounter: [
            "Bossman, original MagSafe and clean thermal paste on top. Last price na {counter}.",
            "I don test logic board on multimeter, zero short circuit! Give me {counter}.",
            "Air freight from London is crazy. The bottom line na {counter}."
          ],
          softenedCounter: [
            "You know tech specs well well. Because you be fellow computer person, take am for {counter}.",
            "Sharp! Drop {counter} make I install full software suite free of charge.",
            "Oya, transfer {counter} make we pack the box with warranty card."
          ],
          acceptedDeal: [
            "Sealed! Test benchmark before you go, machine smooth like butter!",
            "You negotiate sharp like terminal command! Unit is yours!",
            "Receipt signed! 6 months board warranty included, enjoy your machine!"
          ],
          walkAwayCallback: [
            "Bossman wait! Otigba bridge boys go give you iCloud-locked paperweight! Come pay {counter}!",
            "Hold on, tech bro! Don't enter rain, let us settle this hardware for {counter}!",
            "Bros wait now! Let's close am at {counter} with free laptop sleeve!"
          ],
          walkAwayLost: [
            "Waka go! When cheap board overheat for house tomorrow, no come cry here!",
            "Go roam Otigba street, clean serial number no dey easy to find!",
            "Shift make real coder inspect the rig!"
          ],
          outOfPatience: [
            "Patience kernel panic! Shut down your bargaining, shop closed!",
            "I get 5 laptops to reball on BGA machine, move along!",
            "Time out, my guy! Step aside!"
          ]
        }
      },
      {
        id: "mama_bose",
        name: "Mama Bose Accessories",
        title: "Otigba Gadget & Audio Queen",
        avatar: "🎧",
        personality: "High-energy, witty woman with piles of phone accessories, knows every clone and original in the village",
        basePatience: 95,
        patienceLossPerOffer: 15,
        insultToleranceRatio: 0.65,
        callbackChance: 0.80,
        dialogue: {
          greetings: [
            "Fine boy! Doctor! Come test fast power accessories and audio gadgets!",
            "Customer of life! Original or grade-1 verified? Mama Bose has everything with receipt!",
            "Enter here! Don't buy roadside wire that will fry your battery, step in!"
          ],
          insults: [
            "Egbami o! Fine boy with empty purse! You wan buy original gadgets with gala money?!",
            "Holy Ghost! Even the packaging box cost pass this your dry offer!",
            "Comot for here! Go charge phone for neighbor house if you no get money!"
          ],
          grumblingCounter: [
            "My fine customer, solid build quality heavy o. Bottom price na {counter}.",
            "I give you 1 month replacement warranty! Settle for {counter}.",
            "Fuel for my shop generator alone is ₦800 per liter! Drop {counter}."
          ],
          softenedCounter: [
            "Aww, because you be fine doctor, Mama Bose go favor you. Pay {counter}.",
            "You get sweet tongue. Drop {counter} make I give you free braided cable.",
            "Pay {counter} sharp sharp make both of us smile."
          ],
          acceptedDeal: [
            "Deal closed! Test am before you step out of stall!",
            "You squeeze Mama Bose, but no wahala! Take am go with blessing!",
            "Sold! Tell your office colleagues that Mama Bose is the plug!"
          ],
          walkAwayCallback: [
            "Fine boy! Where you dey run go?! Come back, take am for {counter}!",
            "Wait na! NEPA go take light tonight o, come take am for {counter}!",
            "Customer wait! Mama Bose will drop price for you, come take am for {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that cheap one wey go swell up burst inside bus tomorrow!",
            "Safe journey! Real capacity no dey roadside!",
            "Mcheww, next customer enter!"
          ],
          outOfPatience: [
            "My saliva don finish today! Shift commot, fine boy!",
            "I no dey talk again, go meet another stall!",
            "Patience don hit zero! Bye bye!"
          ]
        }
      }
    ],
    get seller() {
      return this.sellers[0];
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
        isOriginal: true,
        authBadgeText: "★ CERTIFIED ORIGINAL APPLE HARDWARE",
        dialogue: {
          greetings: [
            "Big man! iPhone 12 Pro (128GB) direct from London! Battery health solid, True Tone intact, clean IMEI! Check am!",
            "Otigba tech master here! Clean graphite iPhone 12 Pro, zero iCloud lock, factory unlocked! How you see am?"
          ],
          playerOfferLines: [
            "Bros, battery health is 84%, replacement go cost me ₦25k. I go pay {offer} for this iPhone.",
            "Oga, no follow-come charger inside pack. I fit pay {offer} instant transfer.",
            "Senior man, release this iPhone 12 Pro for {offer} make I wipe am carry go.",
            "I hold {offer} clean transfer ready for this iPhone right now."
          ],
          grumblingCounter: [
            "Bros, clear receipt, face ID working, True Tone active, clean logic board. Bottom line na {counter}.",
            "This no be gevey sim or bypassed iCloud phone o! Factory unlocked. Last price na {counter}.",
            "Airport customs and dollar rate killed our phone margins. Drop {counter}."
          ],
          softenedCounter: [
            "Because you understand diagnostics and 3uTools, I leave am for {counter}.",
            "Drop {counter} make I give you free 20W fast-charging adapter and screen guard.",
            "Transfer {counter} make I wipe the phone and set up your Apple ID."
          ],
          insults: [
            "Guy, dey play! Even the replacement screen alone cost pass this your dry offer!",
            "Are you joking or you want me to sell you dummy phone from roadside?! Comot here!",
            "Guy, you dey whine me? This one na Factory Unlocked iPhone o, no be itel!"
          ],
          acceptedDeal: [
            "Done deal! Check camera, test Face ID, sign receipt! Clean phone is yours!",
            "Sharp negotiation, chairman! 3 months warranty included, enjoy your iPhone!",
            "Wiped and ready! Put your SIM card, browse 5G!"
          ],
          walkAwayCallback: [
            "Guy! Wait! Where you dey go?! Don't go buy iCloud-locked paperweight for roadside! Come pay {counter}!",
            "Chairman hold on! True Tone and clean IMEI guaranteed! Come take am for {counter}!",
            "Oga wait! Na original Apple logic board o! Come back take am for {counter}!"
          ],
          walkAwayLost: [
            "Waka pass, bros! Go buy that cheap one down the street make screen turn white tomorrow!",
            "You will be back! Only clean IMEI in this whole Ikeja!",
            "Shift make serious iPhone buyer test the True Tone!"
          ],
          playerWalkAway: "This iPhone 12 Pro cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, open Settings make I check 3uTools score, battery health and True Tone! Stainless bezel get small micro-scratch!",
              successText: "Ah, small micro-scratch on stainless bezel na him you spot? Oya no wahala, I drop am to {counter}.",
              backfireText: "Guy, you dey doubt Factory Unlocked Apple device with 100% genuine True Tone?! Price na {counter} now!",
              failText: "Commot for here! 100% green 3uTools score, zero replaced part! Stop finding fake problem!"
            },
            sweet_talk: {
              playerText: "Engr. Chidi! Everybody in Otigba know say your stall get the cleanest UK-used iPhones! Bless your boy with price.",
              sellerResponse: "Haha! Tech bro knows tech bro! Because you hail me with street respect, I slash the price!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the phone shop down Pepple street dey sell clean iPhone 12 Pro for cheaper? Okay I dey come...",
              sellerResponse: "Those Pepple street boys dey sell bypassed water-damaged phones! Take this clean unit for {counter}!"
            },
            show_cash: {
              playerText: "*(Shows instant bank transfer app)* Instant transfer alert ready on screen for this iPhone. Accept am now or I waka!",
              agreedResponse: "Oya initiate transfer! Phone is wiped clean, collect your device!",
              rejectResponse: "Keep your transfer for account! Factory unlocked iPhone no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "battery_health_check",
            label: "🔋 Check Battery Health % in Settings",
            playerText: "Let me check Settings: Battery health is 84%! Battery replacement go cost me ₦25k, drop to {price}.",
            discountPct: 0.38,
            sellerResponse: "84% na original follow-come battery o! But because you understand diagnostics, I drop to {counter}."
          },
          {
            id: "imei_3utools",
            label: "💻 Demand 3uTools Green Score",
            playerText: "I want plug am to laptop check 3uTools score! If camera or screen don change, sell for {price}.",
            discountPct: 0.44,
            sellerResponse: "Clean green 100% score guaranteed! No swapped parts. Last price na {counter}."
          },
          {
            id: "cash_transfer_instant",
            label: "📱 Instant Bank Transfer Ready",
            playerText: "Transfer alert on the spot, confirm in 10 seconds. Settle at {price} make we seal am.",
            discountPct: 0.32,
            sellerResponse: "Alert confirmed sharp sharp is sweet. Give me {counter} make I wipe the phone for you."
          }
        ]
      },
      {
        id: "macbook_air",
        name: "MacBook Air M1 (Silver)",
        desc: "Apple Silicon, 256GB SSD, Cycle count 112. Pristine keyboard, original MagSafe.",
        askingPrice: 620000,
        floorPrice: 420000,
        marketFairPrice: 480000,
        icon: "💻",
        isOriginal: true,
        authBadgeText: "★ ORIGINAL APPLE SILICON HARDWARE",
        dialogue: {
          greetings: [
            "Bossman! MacBook Air M1 with Apple Silicon! Clean cycle count 112, original MagSafe, pristine retina display! Step inside!",
            "Programmer / Creative! Check this M1 speed, SSD read speed 3000MB/s, zero motherboard bypass! What do you think?"
          ],
          playerOfferLines: [
            "Bros, M2 and M3 laptops don flood market, M1 prices don drop. I fit pay {offer} for this MacBook.",
            "Oga, cycle count 112 means heavy office usage. I go drop {offer} cash.",
            "Chief, my remote-work laptop budget is capped at {offer}. Take am make we close.",
            "I dey pay {offer} instant transfer for this M1 Air, no time wasting."
          ],
          grumblingCounter: [
            "Bossman, M1 na legendary silent battery beast, 18 hours unplugged! Bottom price na {counter}.",
            "Motherboard tested on multimeter, zero short circuit, clean serial. Last price na {counter}.",
            "Air freight on laptops from Heathrow is crazy. Give me {counter}."
          ],
          softenedCounter: [
            "Because you be fellow coder and creative, I leave am for {counter}.",
            "Drop {counter} make I install full Adobe & Microsoft suite free of charge.",
            "Transfer {counter} make I put padded laptop sleeve inside box."
          ],
          insults: [
            "Guy! You wan buy Apple Silicon M1 machine with calculator budget? Tufiakwa!",
            "Shift commot! Go Otigba bridge go buy Pentium 4 if this na your cash!",
            "Even original 30W Apple charger adapter alone cost money! Don't joke here!"
          ],
          acceptedDeal: [
            "Sealed! Benchmark tested, machine smooth like butter! MacBook Air is yours!",
            "Receipt stamped! 6 months board warranty included, code your way to millions!",
            "Sold! Clean logic board, zero MDM enrollment, enjoy your Mac!"
          ],
          walkAwayCallback: [
            "Bossman wait! Otigba bridge boys go sell you MDM-enrolled corporate laptop! Come pay {counter}!",
            "Hold on, tech bro! Don't leave Apple Silicon for plastic Windows PC! Take am for {counter}!",
            "Wait bros! Settle this M1 Air at {counter} with free sleeve!"
          ],
          walkAwayLost: [
            "Waka go! Clean M1 serial number without iCloud lock no dey easy to find!",
            "Bye bye! When GPU freeze for house tomorrow on cheap laptop, remember Stanley Chips!",
            "Next coder please!"
          ],
          playerWalkAway: "This MacBook Air cost pass my power. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, let me check the System Information: Battery cycle count, SSD health and thermal paste! Trackpad get minor shine!",
              successText: "Ah, you spot slight trackpad wear? Okay coder, I drop am to {counter}.",
              backfireText: "God forbid! You dey claim Apple M1 chip with flawless logic board get defect?! Price na {counter} now!",
              failText: "Pristine retina panel, zero dead pixels, clean battery! No invent fault!"
            },
            sweet_talk: {
              playerText: "Stanley Chips! You be the undisputed logic-board master of Computer Village! Give a fellow techie a solid deal.",
              sellerResponse: "Haha! Developer brother! Because you respect the craft, I give you good discount!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the laptop store inside Medical road get clean M1 MacBook cheaper? I dey come...",
              sellerResponse: "Medical road vendors go give you swollen battery laptop! Take this pristine unit for {counter}!"
            },
            show_cash: {
              playerText: "*(Shows transfer screen)* Clean transfer ready on the spot for this MacBook. Take am or I waka!",
              agreedResponse: "Send the transfer! Pack the MacBook inside padded sleeve for customer!",
              rejectResponse: "Keep your money! Apple Silicon laptop no be scrap sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "m2_market_drop",
            label: "📉 Leverage M2 & M3 Market Arrival",
            playerText: "M2 and M3 laptops don flood market, M1 prices don drop! Fair valuation na {price}.",
            discountPct: 0.36,
            sellerResponse: "M1 na the most stable legendary chip Apple ever build! But I fit release am for {counter}."
          },
          {
            id: "cycle_count",
            label: "🔋 Scrutinize Battery Cycle Count",
            playerText: "Cycle count 112 means heavy daily office use. Compensate my battery wear at {price}.",
            discountPct: 0.42,
            sellerResponse: "Haba, 112 cycles is barely used! But fine, drop {counter} make you carry am."
          },
          {
            id: "cash_bundle",
            label: "💵 Corporate Transfer Authority",
            playerText: "My company budget for remote work laptop is capped at {price}. Take it or I buy Lenovo.",
            discountPct: 0.46,
            sellerResponse: "Don't go buy plastic Windows laptop! Take Apple Silicon for {counter}."
          }
        ]
      },
      {
        id: "power_bank",
        name: "20,000mAh Super-Fast Power Bank",
        desc: "Dual USB-C, built-in emergency torchlight for sudden NEPA blackouts. 22.5W PD fast-charging.",
        askingPrice: 35000,
        floorPrice: 13000,
        marketFairPrice: 18000,
        icon: "🔋",
        isOriginal: false,
        authBadgeText: "GRADE-1 FAST-CHARGE POWER BANK",
        dialogue: {
          greetings: [
            "Senior man! You need heavy 20,000mAh fast-charge power bank? Dual Type-C output, bright emergency LED torch! Check am!",
            "Doctor! Come test super-fast power bank! Real lithium polymer battery wey go charge phone 5 times straight!"
          ],
          playerOfferLines: [
            "Bros, this power bank casing light small. Internal cell fit be 12,000mAh real. I go drop {offer}.",
            "Oga, no fast braided cord inside the box. I fit pay {offer} cash for this power bank.",
            "Senior man, NEPA transformer blow for my street. Help a brother with {offer} for this battery.",
            "Chief, I dey pay {offer} right now for this 20,000mAh power bank."
          ],
          grumblingCounter: [
            "Haba chief, original 20,000mAh lithium polymer cell heavy o! Cargo freight killed profit. Pay {counter}.",
            "This power bank get fast-charging PD chip inside, no be empty plastic! Last price na {counter}.",
            "Fuel for my shop generator to test your gadget alone cost money! Bring {counter}.",
            "Look the LED battery percentage display na, crisp digital readout! Drop {counter}."
          ],
          softenedCounter: [
            "Because you get emergency blackout wahala, I drop this power bank to {counter}.",
            "Take am for {counter} make I give you free braided fast-charging cable join am.",
            "Drop {counter} make you carry this battery go before darkness fall."
          ],
          insults: [
            "Holy Ghost! You wan buy 20,000mAh heavy lithium power bank with recharge card money?!",
            "Dey play! Go buy roadside torchlight if this na your budget for power bank!",
            "You think say na empty plastic with sand inside dem pack for this battery?! Shift commot!"
          ],
          acceptedDeal: [
            "Done deal! Plug your phone make you see the fast-charge symbol before you leave! Enjoy your power bank!",
            "You squeeze my profit on this power bank, but carry am go! Battery go save your phone during blackout!",
            "Sold! Tested and 100% full charge! Enjoy uninterrupted power!"
          ],
          walkAwayCallback: [
            "Chairman wait! NEPA go take light tonight o, you need this power bank! Come pay {counter}!",
            "Boss don't walk away! Original battery capacity scarce for market, come take am for {counter}!",
            "Doctor wait na! Mama Bose will drop price for you, come take this power bank for {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that roadside clone wey go swell up burst inside your pocket next week!",
            "Safe journey! Real lithium polymer capacity no dey roadside!",
            "Shift make people with dead battery buy!"
          ],
          playerWalkAway: "This 20,000mAh power bank cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, check this USB-C port and plastic casing! The casing feel light and the port loose small! You sure say battery cells complete?",
              successText: "Ah, small scratch on plastic casing or stiff power switch na him you spot? Oya no wahala, I drop am to {counter}.",
              backfireText: "God forbid! You dey claim say original Anker/Oraimo grade power bank get fake cells?! Price don climb to {counter}!",
              failText: "Factory-sealed lithium pack, heavy like lead, zero loose port! Stop finding fake problem!"
            },
            sweet_talk: {
              playerText: "Oga tech master! Everybody know say your stall get the cleanest batteries and accessories in Otigba! Bless a loyal brother with discount.",
              sellerResponse: "Haha! You get sweet mouth for gadget market! Because you hail me, I cool down for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say that shop down Otigba street dey sell original 20,000mAh power bank cheaper? Okay I dey come...",
              sellerResponse: "Don't go buy sand inside plastic battery casing down the road! Take this tested power bank for {counter} right now!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on stall table)* See raw cash in hand. Take am for this 20,000mAh power bank now now or I waka!",
              agreedResponse: "Oya slap the cash down! Plug your phone, test the LED torch, power bank is yours!",
              rejectResponse: "Keep your cash for pocket! Heavy lithium battery no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "capacity_test",
            label: "⚖️ Weigh Power Bank in Hand",
            playerText: "This unit light small, internal battery cell na probably 12,000mAh real capacity! Slash to {price}.",
            discountPct: 0.50,
            sellerResponse: "Ah ah, you dey weigh power bank with hand?! No wahala, take am for {counter}."
          },
          {
            id: "nepa_sympathy",
            label: "⚡ NEPA Blackout Emergency Plea",
            playerText: "NEPA transformer blow for my street, phone don die! Help a brother with {price}.",
            discountPct: 0.40,
            sellerResponse: "Chai, NEPA wahala touches everybody. Pay {counter} make you get light tonight."
          },
          {
            id: "combo_cable",
            label: "🔌 Demand Free Fast-Charge Cable",
            playerText: "I will pay {price} if you add high-speed Type-C to Lightning cable free.",
            discountPct: 0.45,
            sellerResponse: "Sharp negotiator! Oya drop {counter} and carry the fast cable join am."
          }
        ]
      },
      {
        id: "airpods_pro",
        name: "AirPods Pro (2nd Gen) 'Grade 1 Clone'",
        desc: "Pop-up animation works on iOS, active noise cancellation is mostly psychological. Wireless charging case.",
        askingPrice: 25000,
        floorPrice: 8000,
        marketFairPrice: 12000,
        icon: "🎧",
        isOriginal: false,
        authBadgeText: "GRADE-1 BLUETOOTH AUDIO CLONE",
        dialogue: {
          greetings: [
            "Fine boy! AirPods Pro (2nd Gen) grade-1 clone! iOS pop-up animation works, clean wireless charging! Test am for ear!",
            "Customer! High-grade wireless earbuds with spatial audio and deep bass! Check the charging case!"
          ],
          playerOfferLines: [
            "Bros, I put am for ear, active noise cancellation still dey hear traffic noise! Give me honest clone price of {offer}.",
            "Oga, the iOS pop-up card took 6 seconds to appear, chip na Jerry chip. I go pay {offer}.",
            "Senior man, give me {offer} plus extra silicon ear tips make I carry am.",
            "I dey drop {offer} cash for this wireless pods now now."
          ],
          grumblingCounter: [
            "Haba! Bluetooth 5.3 chip, GPS location tracking and touch volume slide on stem! Bottom price na {counter}.",
            "This no be that cheap plastic earphone wey go spoil speaker in 2 days! Last price na {counter}.",
            "Drop {counter} make I give you free silicone protective case."
          ],
          softenedCounter: [
            "Because you love good music and podcasts, take am for {counter}.",
            "Pay {counter} make you enjoy wireless beats for your daily commute.",
            "Drop {counter} make I test the microphone on WhatsApp voice note for you."
          ],
          insults: [
            "Dey play! You wan buy ANC wireless earbuds with wired earpiece money?!",
            "Shift commot! Go buy wired hand-me-down earphones if this na your budget!",
            "Even the charging case magnet cost pass this your dry offer!"
          ],
          acceptedDeal: [
            "Deal! Pop open the lid, connect Bluetooth, enjoy your heavy bass! Earbuds are yours!",
            "Sold! You squeezed my audio profit, but rock your pods with style!",
            "Bagged! Put am inside ears, bob your head to music!"
          ],
          walkAwayCallback: [
            "Fine boy wait! Don't go tangle yourself with wire earphones outside! Come take am for {counter}!",
            "Hold on audio boss! Let us settle this AirPods clone at {counter}!",
            "Wait customer! Come take your wireless pods for {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that mono earphone wey go deaf your left ear tomorrow!",
            "Safe journey! Nobody sells this Jerry chip clone cheaper in Ikeja!",
            "Shift make real music lovers test the pods!"
          ],
          playerWalkAway: "This wireless earbuds cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, check the hinge magnet and speaker mesh! The lid hinge feel loose and ANC microphone get hiss sound!",
              successText: "Chai, your ear sharp like sound meter! Okay, because you catch the hinge play, drop {counter}.",
              backfireText: "God forbid! You dey claim say grade-1 audio clone get defect?! Price na {counter} now!",
              failText: "Clean magnetic snap, crisp treble, zero hiss! Stop inventing problem!"
            },
            sweet_talk: {
              playerText: "Mama Bose / Master! Your stall get the crispest sound accessories in Ikeja! Hook up your guy with friendly price.",
              sellerResponse: "Haha! Fine customer with music taste! I slash the price for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the earphone guy under bridge dey sell this same pods cheaper? Okay I dey come...",
              sellerResponse: "Bridge boys dey sell dead battery pods wey last 15 minutes! Take this tested pods for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Raw cash on table for this wireless earbuds. Take am now now or I waka!",
              agreedResponse: "Slap the cash down! Put the pods inside pocket, sealed!",
              rejectResponse: "Keep that cash! Bluetooth wireless pods no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "anc_bluff",
            label: "🔇 Test Transparency & ANC Mic",
            playerText: "I put am for ear, noise cancellation still dey hear traffic noise! Give me honest clone price of {price}.",
            discountPct: 0.55,
            sellerResponse: "You wan make ₦20k pod block airplane sound?! Haha! Take am for {counter}."
          },
          {
            id: "pop_up_lag",
            label: "📱 Point Out iOS Pop-up Delay",
            playerText: "The iOS pop-up card took 6 seconds to appear, chip is standard Jerry chip. {price} is fair.",
            discountPct: 0.48,
            sellerResponse: "Chai, you be software inspector! Okay drop {counter} make we close."
          },
          {
            id: "spare_tips",
            label: "📦 Free Silicon Ear Tips Request",
            playerText: "Give me {price} plus extra small & large ear tips.",
            discountPct: 0.42,
            sellerResponse: "Everything inside the pack, sealed! Bring {counter} make you carry am."
          }
        ]
      }
    ]
  },
  {
    id: "mile12",
    name: "Mile 12 Wholesale Food Market",
    tagline: "The Food Basket of Lagos: Bags, Baskets & Raw Hustle",
    bgGradient: "from-yellow-950 to-stone-950",
    sellers: [
      {
        id: "danladi",
        name: "Alhaji Danladi",
        title: "Wholesale Produce King",
        avatar: "🧔🏾",
        personality: "Calm, firm northern trader, quotes trailer costs and fuel prices, hates lowballers",
        basePatience: 100,
        patienceLossPerOffer: 11,
        insultToleranceRatio: 0.68,
        callbackChance: 0.70,
        dialogue: {
          greetings: [
            "Sannu customer! Welcome to Mile 12. Fresh harvest from the north just arrived!",
            "Aboki na! Look this farm harvest, direct from northern soil, clean and sweet!",
            "Enter inside, customer. Pure wholesale price, no middlemen!"
          ],
          insults: [
            "Subhanallah! What kind of joke is this? Did I harvest goods with sand?!",
            "Haba Alhaji! Go and buy spoiled roadside waste if you don't have money for real harvest!",
            "God forbid! Do you know how much diesel costs from Niger state to Lagos?!"
          ],
          grumblingCounter: [
            "Customer, be fair. Transporters took all our profit. Bottom price na {counter}.",
            "Haba, don't squeeze farmer. Take am for {counter} make you carry am.",
            "I no fit go below {counter}. Foodstuff cost for farm this season."
          ],
          softenedCounter: [
            "Toh, because you be good customer, take am for {counter}.",
            "Allah bless your soup pot. Drop {counter} make boys load am for your boot.",
            "No wahala, pay {counter} and carry the blessing go."
          ],
          acceptedDeal: [
            "Bismillah! Deal closed. May this food bring long life to your family!",
            "You negotiate well, customer. Take am go!",
            "Done! When next you need wholesale foodstuff, ask for Alhaji Danladi."
          ],
          walkAwayCallback: [
            "Customer! Tsaya (wait)! Why you dey rush? Come back, take am for {counter}!",
            "Haba oga! Don't enter the heat! Bring {counter} make we settle!",
            "Customer of life! Come back, let us do business!"
          ],
          walkAwayLost: [
            "Toh, safe journey! You won't find this sweet harvest in any supermarket!",
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
      {
        id: "iya_moria",
        name: "Iya Moria",
        title: "Pepper & Tomato Wholesale Titan",
        avatar: "🌶️",
        personality: "Boisterous, energetic Yoruba market titan surrounded by giant raffia baskets, speaks fiery market slang",
        basePatience: 105,
        patienceLossPerOffer: 13,
        insultToleranceRatio: 0.64,
        callbackChance: 0.78,
        dialogue: {
          greetings: [
            "Customer dada! Enter my stall! See fresh food produce wey sweet pass honey!",
            "Oko mi / Iyawo mi! Fresh shipment just landed from Plateau state this 4:00 AM!",
            "Welcome o! Market opened with your blessed footsteps! Come see firm fresh goods!"
          ],
          insults: [
            "Egbami! Oya pepper scatter for your eyes! You wan buy full trailer goods with pocket money?!",
            "Mo gbe! Look at this person pricing trailer produce like sachet water!",
            "Ta lo ran e wa?! Go buy rotten roadside waste if you no hold money!"
          ],
          grumblingCounter: [
            "Haba customer, driver collect heavy freight on road! Lowest I fit drop na {counter}.",
            "Look as goods clean and solid, no soft rot inside! Bring {counter}.",
            "You wan cook sweet pot without paying farmer? Drop {counter} make we tie load."
          ],
          softenedCounter: [
            "Aww, because you greet with respect, Iya Moria go bless your kitchen: take am for {counter}.",
            "Fine buyer! Pay {counter} make I add extra items on top for free.",
            "Drop {counter} make boys carry load straight go your motor boot."
          ],
          acceptedDeal: [
            "Deal sealed! Your family food go sweet make neighbors smell am! Take am!",
            "Sharp negotiation! Iya Moria blesses your kitchen pot!",
            "Boys, load am sharp sharp for customer motor! Done deal!"
          ],
          walkAwayCallback: [
            "Customer! Wait na! Don't enter that market mud! Come back, take am for {counter}!",
            "Ah ah! You dey waka leave fresh foodstuff?! Oya come take {counter}!",
            "Wait o! Talk your final mind, no go buy rotten ones outside! Bring {counter}!"
          ],
          walkAwayLost: [
            "Waka lo! Go buy that sour spoiled food for supermarket, you go remember me!",
            "Bye bye o! Better restaurant owners dey line up behind you!",
            "Mcheww! Time waster, shift!"
          ],
          outOfPatience: [
            "My throat don dry! Boys, clear this person make trailer offload pass!",
            "I no fit scream again, market closed for you!",
            "Shift commot, customer dada! Waka!"
          ]
        }
      },
      {
        id: "mallam_garba",
        name: "Mallam Garba",
        title: "Kano Grains & Rice Merchant",
        avatar: "🌾",
        personality: "Pious, calm veteran grain distributor from Kano, stands by stone-free guaranteed sacks",
        basePatience: 100,
        patienceLossPerOffer: 10,
        insultToleranceRatio: 0.70,
        callbackChance: 0.72,
        dialogue: {
          greetings: [
            "Bismillah! Genuine sacks direct from northern mills! Enter customer!",
            "Sannu! Clean grains, zero stones, processed to perfection. Check the sack!",
            "Welcome! Wholesale warehouse at your service, genuine weight guaranteed!"
          ],
          insults: [
            "Astaghfirullah! Did you think we grow food on cloud without diesel and fertilizer?!",
            "Haba! Go buy husk and stones if your budget is this low!",
            "Subhanallah, don't mock honest farmer labor with this price!"
          ],
          grumblingCounter: [
            "Customer, trailer freight from Kano is ₦800,000 per trip. Bottom price is {counter}.",
            "Examine the bag seal! Full weight on scale, not re-bagged short sack. Last price na {counter}.",
            "I have tiny profit margin on grains. Pay {counter} make we offload am."
          ],
          softenedCounter: [
            "Toh, because you buy for family consumption, Allah bless you with {counter}.",
            "You talk with truth. Pay {counter} and enjoy clean food.",
            "Drop {counter} make boys sew the bag top neatly."
          ],
          acceptedDeal: [
            "Alhamdulillah! Deal closed. May this food nourish your entire home!",
            "Honest business concluded. Safe trip back home!",
            "Receipt stamped! Ask for Mallam Garba warehouse anytime you need grains."
          ],
          walkAwayCallback: [
            "Customer tsaya! Wait! Don't let transporters cheat you outside! Take {counter}!",
            "Hold on, Alhaji! The sun is harsh, come back take am for {counter}!",
            "Wait customer! Let us close with barakah at {counter}!"
          ],
          walkAwayLost: [
            "Safe journey! Real clean grain is scarce in this city!",
            "Toh, Allah will send another buyer.",
            "Walk in peace!"
          ],
          outOfPatience: [
            "We have 500 sacks to load onto trailers, please move aside!",
            "Patience is exhausted for today. Shift!",
            "No more bargaining. Safe journey!"
          ]
        }
      }
    ],
    get seller() {
      return this.sellers[0];
    },
    items: [
      {
        id: "abuja_yams",
        name: "Bundle of 5 Grade-1 Abuja Yams",
        desc: "Massive dry tubers from the fertile hills of Abuja. Perfect for pounded yam, heavy weight, sweet and mealy.",
        askingPrice: 35000,
        floorPrice: 15000,
        marketFairPrice: 20000,
        icon: "🥔",
        isOriginal: true,
        authBadgeText: "★ 100% FARM FRESH HARVEST",
        dialogue: {
          greetings: [
            "Sannu customer! 5 heavy tubers of grade-1 Abuja yam! Sweet like sugar, dry like flour for pounded yam! Look the size!",
            "Welcome to Mile 12! Fresh harvest straight from Niger/Abuja farms this morning! Lift one tuber see weight!"
          ],
          playerOfferLines: [
            "Alhaji, tap this yam! The head dry small and e sound light. I fit pay {offer} for the 5 tubers.",
            "Aboki, transporters took your profit, but my kitchen budget is {offer} cash.",
            "Oga, release this 5 tubers for {offer} make boys load am for my car boot.",
            "I hold {offer} clean cash for this bundle of yams, tie am sharp."
          ],
          grumblingCounter: [
            "Customer, diesel for trailer from Abuja to Lagos is ₦800,000 per trip! Bottom price na {counter}.",
            "Look the thickness of the tubers! Pure white pounded yam, zero dark spots. Last price na {counter}.",
            "Haba, don't squeeze farmer. Take am for {counter} make you carry am."
          ],
          softenedCounter: [
            "Toh, because you buy for family pot, take am for {counter}.",
            "Allah bless your kitchen. Drop {counter} make boys tie am with rope.",
            "Pay {counter} make boys help you carry the 5 tubers straight to motor."
          ],
          insults: [
            "Subhanallah! What kind of joke is this?! Did I harvest this yam with sand?!",
            "Haba Alhaji! Go and buy cassava if you don't have money for real yam!",
            "God forbid! Do you know how much fuel costs from Abuja to Mile 12?!"
          ],
          acceptedDeal: [
            "Bismillah! Deal closed. Your pounded yam go smooth like butter! Take am!",
            "You negotiate well, customer! Boys, tie the 5 tubers load am for motor!",
            "Alhamdulillah! May this harvest feed your family with health!"
          ],
          walkAwayCallback: [
            "Customer tsaya! Why you dey rush enter mud? Come back, take the 5 tubers for {counter}!",
            "Haba oga! Don't enter the heat! Bring {counter} make we settle your yams!",
            "Wait! Don't go buy watery yam outside! Come take {counter}!"
          ],
          walkAwayLost: [
            "Toh, safe journey! You won't find this sweet yam anywhere in Lagos supermarkets!",
            "Waka go, Allah will send another buyer.",
            "Safe trip in Lagos traffic!"
          ],
          playerWalkAway: "This bundle of yams cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Alhaji, tap this tuber center and check the root head! E sound hollow small, you sure say no rot inside?",
              successText: "Ah, small dry head na normal farm harvest! Oya pay {counter} make you carry am.",
              backfireText: "Subhanallah! Sweet dry Abuja harvest you say get rot?! The price don rise to {counter}!",
              failText: "Solid tuber like rock, zero rot! Which hollow you dey hear?! Shift!"
            },
            sweet_talk: {
              playerText: "Alhaji Danladi! Your yams dry and heavy pass all the stalls in Mile 12! Dash an honest customer good price.",
              sellerResponse: "Sannu customer! You speak with truth and respect! I cool down for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the trailer boys for back gate dey offload sweet Benue yams cheaper? I dey come...",
              sellerResponse: "Back gate yams na watery cassava-yam! Don't go there, take this sweet harvest for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on table)* Clean cash for these 5 tubers! Collect am now now or I move!",
              agreedResponse: "Bismillah! Collect the money! Boys, carry the 5 tubers straight to car!",
              rejectResponse: "Keep that cash! Real Abuja yam is food for kings!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "tap_tuber",
            label: "🖐️ Tap Yam Tubers with Knuckles",
            playerText: "Alhaji, I tap this middle tuber, e sound hollow inside! Rot fit dey center. Drop to {price}.",
            discountPct: 0.45,
            sellerResponse: "Subhanallah! Tuber solid like granite rock! But because you understand farm produce, pay {counter}."
          },
          {
            id: "trailer_offload_rush",
            label: "🚛 Offer Cash Before Next Trailer Lands",
            playerText: "Another trailer from Zaria is reversing into your stall! Clear this bundle for {price} make space.",
            discountPct: 0.38,
            sellerResponse: "Wallahi, space dey tight! Oya count clean notes, drop {counter} make boys load am."
          },
          {
            id: "wedding_food_plea",
            label: "🍲 Pounded Yam Wedding Feast Emergency",
            playerText: "My mother-in-law is demanding genuine white pounded yam for Sunday. Settle me at {price}.",
            discountPct: 0.50,
            sellerResponse: "Family food is sacred! May your marriage be sweet like this tuber. Settle at {counter}."
          }
        ]
      },
      {
        id: "jos_tomatoes",
        name: "Full Raffia Basket of Jos Plum Tomatoes",
        desc: "Deep red, firm plum tomatoes from Plateau State. Low water content, high stew yield, zero soft rot.",
        askingPrice: 42000,
        floorPrice: 18000,
        marketFairPrice: 24000,
        icon: "🍅",
        isOriginal: true,
        authBadgeText: "★ FRESH JOS HARVEST PLUM TOMATOES",
        dialogue: {
          greetings: [
            "Customer dada! Full giant raffia basket of Jos plum tomatoes! Fresh, firm, round, zero soft rot! Look inside!",
            "Oko mi / Iyawo mi! Fresh basket just landed from Plateau state this 4:00 AM! See solid rodo and tatase!"
          ],
          playerOfferLines: [
            "Iya, check the basket bottom na, some tomatoes don crush from trailer weight. I go drop {offer}.",
            "Mama, I hold {offer} cash for this basket, make my family stew sweet.",
            "Iya Moria, give me {offer} make boys carry am go my car boot.",
            "I dey drop {offer} cash for this basket of tomatoes now now."
          ],
          grumblingCounter: [
            "Haba customer, driver collect ₦150k per basket on road! Lowest I fit drop na {counter}.",
            "Look as tomato round and solid, no watery squash inside! Bring {counter}.",
            "You wan cook rich red stew without paying farmer? Drop {counter} make we tie basket."
          ],
          softenedCounter: [
            "Because you greet with respect, Iya Moria go favor your soup: take am for {counter}.",
            "Fine buyer! Pay {counter} make I add extra rodo and tatase on top for free.",
            "Drop {counter} make boys carry basket straight go your boot."
          ],
          insults: [
            "Egbami! Oya pepper scatter for your eyes! You wan buy full raffia basket with pocket money?!",
            "Mo gbe! Look at this person pricing trailer goods like sachet water!",
            "Ta lo ran e wa?! Go buy rotten roadside waste if you no hold money!"
          ],
          acceptedDeal: [
            "Deal sealed! Your family stew go sweet make neighbors smell am! Take am!",
            "Sharp negotiation! Iya Moria blesses your kitchen pot!",
            "Boys, load am sharp sharp for customer motor! Done deal!"
          ],
          walkAwayCallback: [
            "Customer! Wait na! Don't enter that tomato mud! Come back, take am for {counter}!",
            "Ah ah! You dey waka leave fresh Jos tomato?! Oya come take {counter}!",
            "Wait o! Talk your final mind, no go buy rotten ones outside! Bring {counter}!"
          ],
          walkAwayLost: [
            "Waka lo! Go buy that sour watery tomato for supermarket, you go remember me!",
            "Bye bye o! Better restaurant owners dey line up behind you!",
            "Mcheww! Time waster, shift!"
          ],
          playerWalkAway: "This basket of tomatoes cost pass my power. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Iya Moria, let me press the tomatoes near the basket rim! Some don soft and leak juice under basket!",
              successText: "Ah, two soft tomatoes on top after 12 hours road journey? Oya take am for {counter}.",
              backfireText: "Egbami! You dey call fresh Jos Plateau plum tomato watery?! Price na {counter} now!",
              failText: "Solid like apple! No squash here! Shift make restaurant owners buy!"
            },
            sweet_talk: {
              playerText: "Iya Moria titan of Mile 12! Your tomatoes red pass lipstick! Bless a faithful customer with good price.",
              sellerResponse: "Haha! Customer with sweet mouth! Iya Moria go add free pepper for your soup!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Aunty, you say the wholesaler by Mile 12 bridge selling fresh baskets cheaper? I dey come...",
              sellerResponse: "Bridge tomatoes are overripe rejects! Come back, take this solid basket for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on wooden crate)* Raw cash in hand for this basket of tomatoes. Take am now now or I waka!",
              agreedResponse: "Slap the cash down! Tie the raffia basket tight with twine!",
              rejectResponse: "Keep that small change! Giant basket of Jos tomatoes no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "basket_bottom_rot",
            label: "🔍 Check Raffia Basket Underbelly",
            playerText: "Iya, underneath basket always get squashed tomatoes leaking juice! Compensate rot with {price}.",
            discountPct: 0.42,
            sellerResponse: "Jos plum tomatoes never crush easily! Solid like stone. But okay, pay {counter} make boys tie am."
          },
          {
            id: "extra_rodo_demand",
            label: "🌶️ Demand Free Scotch Bonnet Heap",
            playerText: "I will pay {price} if you add half-custard rubber of red habanero pepper on top free.",
            discountPct: 0.35,
            sellerResponse: "Oya bring the money! Iya Moria go heap rodo on top make your soup pepper well well! Take {counter}."
          },
          {
            id: "restaurant_bulk_promise",
            label: "🍽️ Promise 3-Basket Weekly Supply",
            playerText: "My restaurant in Ikeja needs 3 baskets every Tuesday. Give me contract starter price of {price}.",
            discountPct: 0.48,
            sellerResponse: "Ehen! Long-term restaurant customer! Settle this trial basket at {counter}."
          }
        ]
      },
      {
        id: "foreign_rice",
        name: "50kg Bag of Royal Stallion Foreign Rice",
        desc: "Factory-sealed 50kg bag, pure long-grain parboiled white rice. Zero stones, zero chaff.",
        askingPrice: 88000,
        floorPrice: 52000,
        marketFairPrice: 65000,
        icon: "🍚",
        isOriginal: true,
        authBadgeText: "★ 50KG CLEAN PARBOILED GRAINS",
        dialogue: {
          greetings: [
            "Bismillah! 50kg bag of long-grain parboiled rice direct from warehouse! Zero stones, zero chaff! Check the grain!",
            "Sannu customer! Full factory-sealed 50kg bag, pure white parboiled grains that swell when cooked! Step in!"
          ],
          playerOfferLines: [
            "Mallam, check bag seal na. Sometime dem dey re-bag 42kg into 50kg bag. I fit pay {offer}.",
            "Alhaji, I hold {offer} cash for this 50kg bag of rice, let's close deal.",
            "Oga, release this bag for {offer} make boys load am for pickup.",
            "I dey drop {offer} cash for this 50kg rice bag right now."
          ],
          grumblingCounter: [
            "Customer, trailer freight from Kano is ₦800,000 per trip. Bottom price is {counter}.",
            "Examine the bag seal! Full 50kg on scale, not re-bagged 42kg. Last price na {counter}.",
            "Tiny profit margin on grains, my friend. Pay {counter} make we offload am."
          ],
          softenedCounter: [
            "Toh, because you buy for family consumption, Allah bless you with {counter}.",
            "You talk with truth. Pay {counter} and enjoy clean stone-free rice.",
            "Drop {counter} make boys seal the bag top neatly."
          ],
          insults: [
            "Astaghfirullah! Did you think we grow rice on cloud without diesel and fertilizer?!",
            "Haba! Go buy husk and stones if your budget is this low!",
            "Subhanallah, don't mock honest farmer labor with this price!"
          ],
          acceptedDeal: [
            "Alhamdulillah! Deal closed. May this food nourish your entire home!",
            "Honest business concluded. Boys, seal the bag top neatly and load am!",
            "Receipt stamped! Ask for Mallam Garba warehouse anytime you need grains."
          ],
          walkAwayCallback: [
            "Customer tsaya! Wait! Don't let roadside boys sell you stone-filled bags! Take {counter}!",
            "Hold on, Alhaji! The sun is harsh, come back take am for {counter}!",
            "Wait customer! Let us close with barakah at {counter}!"
          ],
          walkAwayLost: [
            "Safe journey! Real clean grain is scarce in this city!",
            "Toh, Allah will send another buyer.",
            "Walk in peace!"
          ],
          playerWalkAway: "This 50kg bag of rice cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Mallam, let me pierce the sack with tester needle! Make I see if grain get broken pieces or stones inside!",
              successText: "Ah, you spot two broken grains on sampling? Oya pay {counter} make we offload.",
              backfireText: "Subhanallah! Disrespecting honest clean Kano grain without stone?! Price don enter {counter}!",
              failText: "Clean long grain, zero dust, zero stone! Shift!"
            },
            sweet_talk: {
              playerText: "Mallam Garba! You be the most honest grain distributor in all of Mile 12! Favor my family budget.",
              sellerResponse: "Sannu! Honest praise from honest buyer! I drop the price for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the grain warehouse at Ikorodu road get clean 50kg rice cheaper? I dey come...",
              sellerResponse: "Ikorodu warehouse rice is full of sand! Take this certified clean sack for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Clean cash for this 50kg bag of rice. Collect am now or I move!",
              agreedResponse: "Bismillah! Count the cash! Boys, shoulder the bag to customer boot!",
              rejectResponse: "Keep that money! 50kg clean grain is not for distress sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "scale_weight_check",
            label: "⚖️ Demand Stall Platform Scale Weigh-In",
            playerText: "Mallam, put this bag on the platform scale! Sometime re-bagged rice dey short 5kg. Drop to {price}.",
            discountPct: 0.35,
            sellerResponse: "Scale reads 50.4kg exact! Full factory weight. But because scale no lie, take am for {counter}."
          },
          {
            id: "customs_border_rumor",
            label: "🚢 Cite Border Re-Opening Rumors",
            playerText: "News report say Seme border don re-open, trailer rice go flood market next week! Sell for {price}.",
            discountPct: 0.42,
            sellerResponse: "Border rumor na political talk! Cargo still tight. But I fit release am for {counter}."
          },
          {
            id: "cash_boot_load",
            label: "💵 Slap Cash Ready For Wheelbarrow",
            playerText: "See cash in hand right now. Call your wheelbarrow boys, let's seal at {price}.",
            discountPct: 0.40,
            sellerResponse: "Wheelbarrow boys ready! Drop {counter} make dem shoulder am straight to your motor."
          }
        ]
      },
      {
        id: "palm_oil",
        name: "25-Litre Yellow Keg of Pure Nsukka Palm Oil",
        desc: "Thick, unadulterated red oil from Enugu groves. Zero water mixing, zero chemical coloring. Deep aroma.",
        askingPrice: 38000,
        floorPrice: 19000,
        marketFairPrice: 25000,
        icon: "🛢️",
        isOriginal: true,
        authBadgeText: "★ 100% UNADULTERATED NSUKKA PALM OIL",
        dialogue: {
          greetings: [
            "Customer! 25-Litre yellow keg of pure Nsukka palm oil! Thick, unadulterated, zero chemical dye or water! Smell am!",
            "Welcome! First-press red palm oil from eastern groves, cooks sweet soup with rich red color! Check the thickness!"
          ],
          playerOfferLines: [
            "Mama, let me test the keg bottom for water or chemical dye. I go pay {offer}.",
            "Oga, 25-litre keg is heavy. Take {offer} cash make I carry am.",
            "I hold {offer} clean cash for this palm oil, close the deal.",
            "Senior seller, {offer} cash ready for this yellow keg of red oil."
          ],
          grumblingCounter: [
            "Haba customer! Pure red oil without water or chemical red color! Bottom price na {counter}.",
            "Transport cost from Nsukka forest to Mile 12 is huge. Last price na {counter}.",
            "Taste am on your tongue! Zero sour taste, sweet palm aroma. Drop {counter}."
          ],
          softenedCounter: [
            "Because you know good food and pure oil, take am for {counter}.",
            "Drop {counter} make boys seal the yellow keg cap tight with plastic.",
            "Pay {counter} make your oha and egusi soup sweet die."
          ],
          insults: [
            "Tufiakwa! You wan buy 25 litres pure unadulterated palm oil with groundnut oil change?!",
            "Commot for here! Go buy colored water if this na your budget!",
            "You think say palm oil tree grow on cement floor?! Shift!"
          ],
          acceptedDeal: [
            "Deal! Your oha and egusi soup go red and sweet! Enjoy your pure palm oil!",
            "Sold! You beat my price, but business is business! Keg is sealed!",
            "Take am go! Zero water, zero dye, your soup go shine!"
          ],
          walkAwayCallback: [
            "Customer wait! Don't go buy chemical-mixed oil outside wey go poison your soup! Come take {counter}!",
            "Hold on oga! Come back take pure Nsukka palm oil for {counter}!",
            "Stop! Let us settle this 25L keg at {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that watery oil wey go separate inside pot!",
            "Safe trip! Pure first-press red oil scarce for Lagos!",
            "Shift make real cooks buy!"
          ],
          playerWalkAway: "This 25L palm oil cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o, shake the keg make I check viscosity! The oil look thin small on the plastic wall, you sure say water no dey inside?",
              successText: "Ah, oil thin because sun hot today! Oya take am for {counter}.",
              backfireText: "God forbid! You dey claim pure first-press Nsukka red oil get water?! Price na {counter} now!",
              failText: "Thick like honey, zero water! No accuse honest trade! Shift!"
            },
            sweet_talk: {
              playerText: "Mama of the groves! Your red oil na the richest in Mile 12! Bless my kitchen with discount.",
              sellerResponse: "Aww, good pikin! Your kitchen go always smell sweet! I drop price for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the oil seller by Owode market get pure 25L keg cheaper? I dey come...",
              sellerResponse: "Owode oil is mixed with dye and paraffin! Don't risk your stomach, take this pure oil for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on keg)* Raw cash on the keg for this 25L palm oil. Take am now or I waka!",
              agreedResponse: "Slap the cash down! Tighten the keg seal, load am for boot!",
              rejectResponse: "Keep your cash! Pure red palm oil no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "taste_test",
            label: "👅 Dip Clean Finger For Tongue Taste Test",
            playerText: "Let me taste on my tongue! Fresh oil shouldn't itch throat. If unadulterated, I pay {price}.",
            discountPct: 0.40,
            sellerResponse: "Taste am! Pure sweet palm fruit nectar, zero chemicals. Settle at {counter}."
          },
          {
            id: "keg_return_deal",
            label: "🛢️ Promise Yellow Jerrycan Return",
            playerText: "Next week I go return this clean 25L yellow jerrycan. Cut plastic cost, give me {price}.",
            discountPct: 0.35,
            sellerResponse: "Jerrycan itself cost ₦2,500! If you promise to return am, pay {counter}."
          },
          {
            id: "soup_pot_rush",
            label: "🍲 Saturday Owanbe Cooking Deadline",
            playerText: "Caterers are waiting for oil in the kitchen right now! Close at {price} make I zoom off.",
            discountPct: 0.45,
            sellerResponse: "Go cook delicious soup for the party! Bring {counter} make boys seal the lid."
          }
        ]
      }
    ]
  },
  {
    id: "alaba",
    name: "Alaba International Market",
    tagline: "The Electronics Capital of West Africa (Ojo)",
    bgGradient: "from-purple-950 to-slate-950",
    sellers: [
      {
        id: "uche_power",
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
            "Odogwu! You want heavy machinery wey go carry whole house without shaking? Step in!",
            "Senior man! Pure certified specs we dey talk here, no be that roadside imitation!"
          ],
          insults: [
            "Chineke Nna! Are you pricing heavy machinery or electric kettle?!",
            "Look this boy o! Do you think I picked certified appliances from gutter?!",
            "Commot for my warehouse! Go buy candle if you no get money for heavy equipment!"
          ],
          grumblingCounter: [
            "Chairman, dollar to naira at wharf killed us. Bottom line na {counter}.",
            "Look the weight! Heavy-duty engineering heavy like rock. Last price na {counter}.",
            "I no dey sell fake things here. Drop {counter} make boys load am for your motor."
          ],
          softenedCounter: [
            "Alright boss, because you be big man, take am for {counter}.",
            "Odogwu, pay {counter} and carry 1-year guarantee.",
            "Oya no wahala, transfer {counter} make we wrap am."
          ],
          acceptedDeal: [
            "Deal! Carry am go! When equipment start, your neighbors go salute!",
            "Sharp business, chairman! Next time you need electronics, ask for Chief Uche!",
            "Receipt issued! May your house never see darkness or trouble again!"
          ],
          walkAwayCallback: [
            "Chairman! Hold on! Where you dey waka go? Oya come back, take am for {counter}!",
            "Chief! Don't go outside to buy cheap imitation wey go burn tomorrow! Take {counter}!",
            "Boss wait! Come back make we seal am like brothers!"
          ],
          walkAwayLost: [
            "Waka go! When that cheap imitation burn your house, you go still come back here!",
            "Bye bye! Only Chief Uche get genuine spec in this section!",
            "Shift make better customer enter!"
          ],
          outOfPatience: [
            "I no get strength for child's play today! Shift commot for my warehouse!",
            "Boys, clear this person make forklift pass!",
            "Business don close for you!"
          ]
        }
      },
      {
        id: "bros_kingsley",
        name: "Bros Kingsley",
        title: "Sound System & Home Theater Don",
        avatar: "🔊",
        personality: "Boombox and sound specialist, tests heavy bass that shakes the floor, talks decibels and wattage",
        basePatience: 105,
        patienceLossPerOffer: 12,
        insultToleranceRatio: 0.67,
        callbackChance: 0.76,
        dialogue: {
          greetings: [
            "Sound Master! You want sound system wey go make your street know say you arrive? Step inside!",
            "Chairman! See heavy acoustic vibration! When this system kick, even your ceiling fan go dance!",
            "Welcome to Sound Kingdom! Clean Bluetooth, heavy treble, pure cinematic sound!"
          ],
          insults: [
            "Chai! Bros, are you pricing pocket radio or massive sub-bass monster?!",
            "Comot for here! That price cannot even buy the speaker magnet!",
            "Dey play! Go buy whistle blow for mouth if this na your budget!"
          ],
          grumblingCounter: [
            "Chairman, heavy magnet equipment heavy for freight cost. Bottom price na {counter}.",
            "Test the sound quality! Zero distortion at maximum volume. Last price na {counter}.",
            "I give you free HDMI and optical cable join am. Drop {counter}."
          ],
          softenedCounter: [
            "Alright boss, because you love good entertainment, I leave am for {counter}.",
            "Sharp ears! You know acoustic balance. Pay {counter} make we seal carton.",
            "Transfer {counter} right now make I program the remote for you."
          ],
          acceptedDeal: [
            "Boom! Deal closed! Play Burna Boy tonight, make whole neighborhood hear!",
            "Sound tested and approved! You beat my price, but business na business!",
            "Carton sealed! Guarantee receipt inside. Enjoy heavy sound!"
          ],
          walkAwayCallback: [
            "Sound Master! Wait! Don't walk away from pure bass! Come back, take am for {counter}!",
            "Chairman hold on! Those road boys go sell you empty casing! Take this for {counter}!",
            "Boss wait now! Let's close am at {counter} with free aux cable!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that tin-can speaker wey sound like empty milk cup!",
            "Safe journey! Nobody in Alaba got this acoustic clarity!",
            "Shift make real party organizers inspect the audio!"
          ],
          outOfPatience: [
            "My eardrums need rest from your lowballing! Warehouse closed for you!",
            "Boys, switch off the speaker test! This customer is not ready!",
            "Waka commot, chief!"
          ]
        }
      },
      {
        id: "chief_obinna_solar",
        name: "Chief Obinna Solar",
        title: "Solar Inverter & Power Mogul",
        avatar: "⚡",
        personality: "Calm, calculating green-energy importer with clipboard, explains MPPT efficiency and battery lifecycle",
        basePatience: 100,
        patienceLossPerOffer: 11,
        insultToleranceRatio: 0.72,
        callbackChance: 0.74,
        dialogue: {
          greetings: [
            "Distinguished customer! Say goodbye to NEPA blackouts and generator noise!",
            "Senior Advocate! Pure Sine Wave hybrid solar inverter, 10-year design life!",
            "Welcome! Alaba solar direct importer. Cut your electricity bill to zero today!"
          ],
          insults: [
            "Chineke! Are you pricing high-voltage copper transformer or car battery charger?!",
            "Oga, dey play! German engineering no be toy for child play!",
            "Comot for my office! If you no get funds for solar, continue buying petrol for darkness!"
          ],
          grumblingCounter: [
            "Distinguished buyer, lithium compatibility and MPPT controller cost real Euro. Last price na {counter}.",
            "Pure Sine Wave protect all your delicate electronics. Settle for {counter}.",
            "I give you 2-year replacement warranty on board. Give me {counter}."
          ],
          softenedCounter: [
            "Alright boss, because you want stable light for your family, take am for {counter}.",
            "Good choice. Solar investment pays for itself. Pay {counter}.",
            "Oya no problem, transfer {counter} and boys will crate the inverter."
          ],
          acceptedDeal: [
            "Deal sealed! When NEPA strike darkness tonight, your house go shine like palace!",
            "Congratulations on energy independence! Chief Obinna stands behind your warranty!",
            "Receipt stamped! Go enjoy 24/7 unshakeable electricity!"
          ],
          walkAwayCallback: [
            "Distinguished sir! Hold on! Don't go back to darkness! Come back, take am for {counter}!",
            "Oga wait! Petrol price is climbing tomorrow, secure your solar for {counter}!",
            "Chairman wait! Let's settle this unit at {counter}!"
          ],
          walkAwayLost: [
            "Safe journey! When generator petrol finish at 2 AM, remember Chief Obinna!",
            "Waka go, inverter no be for people wey love blackout!",
            "Next client please!"
          ],
          outOfPatience: [
            "I have solar farm installation blueprints to approve, consultation over!",
            "Patience depleted! Move along please!",
            "Office closed for you today!"
          ]
        }
      }
    ],
    get seller() {
      return this.sellers[0];
    },
    items: [
      {
        id: "lutian_generator",
        name: "Lutian 3.5kVA Pure Copper Generator",
        desc: "Key-start, 100% pure copper coil windings. Powers freezer, TV and 1.5HP AC. Built-in AVR voltage stabilizer.",
        askingPrice: 320000,
        floorPrice: 195000,
        marketFairPrice: 235000,
        icon: "⚡",
        isOriginal: true,
        authBadgeText: "★ 100% PURE COPPER COIL SPEC",
        dialogue: {
          greetings: [
            "Chairman! Lutian 3.5kVA generator with 100% pure copper coil windings! Powers freezer, TV and 1.5HP AC! Step inside!",
            "Odogwu! Key-start generator wey go roar carry your whole house without shaking! Check the solid copper weight!"
          ],
          playerOfferLines: [
            "Chief, let me test the coil with multimeter. Fuel rate is ₦850/L, I fit pay {offer} for this generator.",
            "Oga, no engine oil or battery acid inside the carton. I go drop {offer} cash.",
            "Senior man, release this 3.5kVA generator for {offer} make boys load am to my pickup.",
            "I hold {offer} clean cash for this pure copper generator right now."
          ],
          grumblingCounter: [
            "Chairman, look the weight! Pure copper coil heavy like rock, no be roadside aluminum wire! Last price na {counter}.",
            "This engine get AVR voltage stabilizer, won't fry your electronics. Bottom line na {counter}.",
            "Wharf customs duty on heavy machinery was brutal. Bring {counter} make we load am."
          ],
          softenedCounter: [
            "Alright boss, because you be big man wey want light for family, take am for {counter}.",
            "Odogwu, pay {counter} and carry 1-year generator guarantee.",
            "Drop {counter} make boys wheel the generator straight to your car boot."
          ],
          insults: [
            "Chineke Nna! Are you pricing pure copper generator or electric kettle?!",
            "Look this boy o! Do you think I picked 3.5kVA copper coil from gutter?! Comot for my warehouse!",
            "Go buy candle if you no get money for generator! Shift!"
          ],
          acceptedDeal: [
            "Deal! Turn the key, let the engine roar, your neighbors go salute! Generator is yours!",
            "Sharp business, chairman! Next time you need solar, ask for Chief Uche! Enjoy your light!",
            "Carton sealed! 1-year warranty card inside. May your house never see darkness!"
          ],
          walkAwayCallback: [
            "Chairman! Hold on! Don't go outside buy aluminum coil wey go burn next week! Take this for {counter}!",
            "Chief wait! Come back make we load pure copper generator for {counter}!",
            "Wait boss! Let us settle this 3.5kVA generator at {counter}!"
          ],
          walkAwayLost: [
            "Waka go! When that cheap aluminum engine knock at midnight, you go remember Chief Uche!",
            "Safe journey! Nobody in Alaba got genuine Lutian copper coil at that rate!",
            "Forklift coming through, shift!"
          ],
          playerWalkAway: "This 3.5kVA generator cost pass my power abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Chief, tap this engine frame and check the stator housing! The muffler get small paint scratch and frame light small! You sure say coil na 100% copper?",
              successText: "Haba, small scratch on frame paint from container transport? Oya take am for {counter}.",
              backfireText: "Chineke Nna! Pure copper Lutian coil you dey tap with bad-eye?! Price don enter {counter}! Go buy candle!",
              failText: "Heavyweight copper windings, zero aluminum! Don't doubt German-spec engineering! Shift!"
            },
            sweet_talk: {
              playerText: "Chief Uche Power! The whole of West Africa know say your warehouse na home of original power! Treat your brother well.",
              sellerResponse: "Haha! Odogwu! You know who holds the power in Alaba! Because you salute with respect, I drop the price!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Bros, you say that shop by Alaba main gate dey sell 3.5kVA Lutian copper generator for better price? I dey come...",
              sellerResponse: "Those gate boys go sell you spray-painted aluminum generator wey go catch fire! Stay here, take pure copper for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on generator frame)* See raw cash in hand for this 3.5kVA generator. Load am now now or I waka!",
              agreedResponse: "Raw cash talks! Boys, bring the hand truck! Wheel this generator straight into customer pickup!",
              rejectResponse: "Keep that cash for pocket! Pure copper heavy generator no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "copper_multimeter",
            label: "🧲 Multimeter Resistance & Weight Test",
            playerText: "Let me check coil with multimeter! Copper coil heavy, but this one light small. Drop to {price}.",
            discountPct: 0.38,
            sellerResponse: "God forbid! Bring your electrician come weigh am! 100% pure copper! But fine, take {counter}."
          },
          {
            id: "petrol_running_cost",
            label: "⛽ Factor In High Petrol Running Cost",
            playerText: "Fuel is ₦850 per liter, running this engine go chop money! Subsidize my purchase at {price}.",
            discountPct: 0.42,
            sellerResponse: "Fuel rate choke everybody! Okay, because fuel high, I slash price to {counter}."
          },
          {
            id: "forklift_cash",
            label: "💵 Slap Cash Ready For Forklift",
            playerText: "See cash in my hands right now. Settle at {price} make boys load am straight to my pickup.",
            discountPct: 0.35,
            sellerResponse: "Raw cash talks! Boys, bring the hand truck! Pay {counter} make we load am."
          }
        ]
      },
      {
        id: "smart_tv_55",
        name: "55-Inch 4K 'Samsung' Curved Smart TV",
        desc: "Alaba customized casing with brilliant colors and generic Android board. HDR10, frameless bezel.",
        askingPrice: 240000,
        floorPrice: 135000,
        marketFairPrice: 165000,
        icon: "📺",
        isOriginal: false,
        authBadgeText: "ALABA CUSTOM 4K SMART DISPLAY",
        dialogue: {
          greetings: [
            "Chairman! 55-inch 4K Frameless curved Smart UHD TV! Brilliant colors, HDR10, Android smart board with Netflix & YouTube! Step inside!",
            "Sound and picture king here! See cinematic curved screen, razor-sharp 4K resolution! How you see am?"
          ],
          playerOfferLines: [
            "Chief, don't whine me. Casing says Samsung but mainboard na generic Alaba Android. I fit pay {offer}.",
            "Oga, remote control processor get small lag. I go drop {offer} cash.",
            "Bros, give me this 55-inch TV for {offer} plus free tilting wall mount.",
            "I hold {offer} clean cash for this 55-inch screen, test am make I carry am."
          ],
          grumblingCounter: [
            "Chairman, look the crisp 4K panel! Frameless curved glass alone cost heavy money. Bottom line na {counter}.",
            "Crisp colors, zero dead pixels, built-in Wi-Fi! Last price na {counter}.",
            "Drop {counter} make I throw in HDMI cable and heavy wall bracket free."
          ],
          softenedCounter: [
            "Because you love Premier League and movies, take am for {counter}.",
            "Pay {counter} make you enjoy stadium atmosphere in your living room.",
            "Drop {counter} make boys pack the polystyrene box safely for you."
          ],
          insults: [
            "Chai! Are you pricing 55-inch 4K curved smart TV or blackboard for primary school?!",
            "Comot for here! That price cannot even buy the frameless glass panel!",
            "Go buy small black-and-white TV if this na your cash! Dey play!"
          ],
          acceptedDeal: [
            "Boom! Deal closed! Hang am for wall, turn on 4K movie, living room turn cinema! TV is yours!",
            "Sold! Tested and approved! Guarantee card inside carton, enjoy your smart TV!",
            "Pack am well! Zero dead pixel, enjoy cinematic display!"
          ],
          walkAwayCallback: [
            "Chairman wait! Don't go buy blurry 720p TV outside! Come back, take this 55-inch 4K for {counter}!",
            "Boss wait now! Let's close am at {counter} with free heavy wall bracket!",
            "Hold on bros! Let's settle the 55-inch curved TV at {counter}!"
          ],
          walkAwayLost: [
            "Waka go! Go watch black-and-white television if this na your budget!",
            "Safe journey! Nobody gives this frameless curved panel at that price!",
            "Shift make serious movie buffs enter!"
          ],
          playerWalkAway: "This 55-inch Smart TV cost pass my pocket abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Chief, let me inspect the back ports and panel bezel! The plastic casing get generic Android sticker and HDMI port loose small!",
              successText: "Haha! Your eye see road! Sharp buyer! The picture still crisp die. Take am for {counter}.",
              backfireText: "God forbid! You dey insult 55-inch ultra-crisp curved display?! Price don enter {counter}!",
              failText: "Flawless 4K panel, zero pixel defect! Don't invent story! Shift!"
            },
            sweet_talk: {
              playerText: "Bros Kingsley / Chief! Your showroom get the brightest displays in Alaba! Hook up a loyal brother with discount.",
              sellerResponse: "Haha! Boss with taste! Because you hail me, I go slash the price for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the electronics store down electronics line dey sell 55-inch smart TV cheaper? I dey come...",
              sellerResponse: "Those line boys go sell you repaired screen with vertical lines! Take this fresh panel for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash on table)* Raw cash on the counter for this 55-inch TV. Take am or I waka!",
              agreedResponse: "Slap the cash down! Test the display one more time, box am for customer!",
              rejectResponse: "Keep that cash! 55-inch 4K smart TV no be distress sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "alaba_board_callout",
            label: "🔍 Expose Generic Android Mainboard",
            playerText: "Chief, don't whine me. Casing says Samsung but mainboard inside na generic Alaba Android! Drop to {price}.",
            discountPct: 0.42,
            sellerResponse: "Haha! Your eye see road! Sharp buyer! The picture still crisp die. Take am for {counter}."
          },
          {
            id: "remote_lag",
            label: "🎮 Test Remote Control & App Lag",
            playerText: "Netflix taking 10 seconds to load on this board, processor na basic. Compensate me with {price}.",
            discountPct: 0.48,
            sellerResponse: "Connect am to Wi-Fi e go fly! But okay, take {counter} make you carry am."
          },
          {
            id: "wall_bracket_free",
            label: "🧱 Demand Free Heavy-Duty Wall Mount",
            playerText: "I will pay {price} if you add original tilting wall bracket and HDMI cable free.",
            discountPct: 0.38,
            sellerResponse: "Sharp deal! Oya drop {counter} and carry the heavy bracket join am."
          }
        ]
      },
      {
        id: "jbl_boombox",
        name: "JBL Boombox 3 Wireless Speaker",
        desc: "Massive bass, flashing RGB rings. Seller claims 'Waterproof up to Third Mainland Bridge'. 180W RMS.",
        askingPrice: 85000,
        floorPrice: 36000,
        marketFairPrice: 48000,
        icon: "🔊",
        isOriginal: false,
        authBadgeText: "GRADE-1 HEAVY BASS WIRELESS BOOMBOX",
        dialogue: {
          greetings: [
            "Sound Master! JBL Boombox 3 wireless speaker! Massive sub-bass that shakes the floor, flashing RGB lights! Test the wattage!",
            "Welcome to Sound Kingdom! Heavyweight dual woofers, Bluetooth 5.3, party boost mode! Step in!"
          ],
          playerOfferLines: [
            "Bros, crank the volume to 100%! Woofer rattles small at 80Hz, this na grade-1 copy. I go pay {offer}.",
            "Oga, waterproof claims aside, I hold {offer} cash for this boombox.",
            "Senior man, weekend party starts in 2 hours. Release this speaker for {offer}.",
            "I dey pay {offer} cash for this Bluetooth speaker right now."
          ],
          grumblingCounter: [
            "Chairman, heavy magnet speaker heavy for air freight! Bottom price na {counter}.",
            "Test the sound quality! Zero distortion at high volume, 24-hour battery. Last price na {counter}.",
            "Drop {counter} make I give you free heavy aux cable and charging brick."
          ],
          softenedCounter: [
            "Because you love good bass and party vibes, take am for {counter}.",
            "Pay {counter} make you make your neighborhood vibrate tonight.",
            "Drop {counter} make I pair Bluetooth with your phone right now."
          ],
          insults: [
            "Chai! Are you pricing 500W RMS sub-bass monster or pocket transistor radio?!",
            "Dey play! Go buy plastic whistle blow for mouth if this na your pocket!",
            "Even the speaker magnet weight cost pass this your price!"
          ],
          acceptedDeal: [
            "Boom! Deal closed! Play Burna Boy tonight, make whole street feel the bass! Speaker is yours!",
            "Sound tested and approved! You beat my price, but carry the party go!",
            "Boxed and sealed! Charge am full, shake the compound!"
          ],
          walkAwayCallback: [
            "Sound Master! Wait! Don't walk away from pure bass! Come back, take am for {counter}!",
            "Chairman hold on! Those road boys go sell you empty speaker casing! Take this for {counter}!",
            "Boss wait now! Let's close am at {counter} with free aux cable!"
          ],
          walkAwayLost: [
            "Waka go! Go buy that tin-can speaker wey sound like empty milk tin!",
            "Safe journey! Nobody in Alaba got this acoustic clarity!",
            "Shift make real party organizers inspect the audio!"
          ],
          playerWalkAway: "This Boombox speaker cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Bros, let me inspect the passive bass radiator and handle rubber! The bass cone rattle small at max volume!",
              successText: "Chai! You be sound engineer?! Okay, for sound enthusiast, I drop am to {counter}.",
              backfireText: "God forbid! You dey claim monster bass woofer get distortion?! Price na {counter} now!",
              failText: "Solid rubber seal, punchy sub-bass, zero rattle! Shift!"
            },
            sweet_talk: {
              playerText: "Bros Kingsley! The whole Alaba know say you be the Sound Don of Lagos! Bless my sound system budget.",
              sellerResponse: "Sound Master! You know real acoustics! Because you hail me, I discount am for you!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Broda, you say the audio vendor by Alaba market bus stop dey sell this same Boombox cheaper? I dey come...",
              sellerResponse: "Bus stop vendors sell speakers with toy magnets inside! Take this heavy bass monster for {counter}!"
            },
            show_cash: {
              playerText: "*(Slaps Naira cash notes on speaker)* Raw cash ready for this Boombox 3. Collect am now now or I waka!",
              agreedResponse: "Slap the cash down! Package the Boombox inside original box with charging cord!",
              rejectResponse: "Keep that small cash! Heavy bass monster speaker no be giveaway!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "bass_distortion",
            label: "🎵 Turn Bass to 100% and Call Out Distortion",
            playerText: "Crank the volume to max! Woofer rattles small at 80Hz, this na grade-1 copy! Slash to {price}.",
            discountPct: 0.52,
            sellerResponse: "Chai! You be sound engineer?! Okay, for sound enthusiast, I drop am to {counter}."
          },
          {
            id: "waterproof_bluff",
            label: "🌊 Challenge Third Mainland Bridge Claim",
            playerText: "Waterproof up to Third Mainland Bridge?! Put am inside bucket of water now make we see! Settle at {price}.",
            discountPct: 0.45,
            sellerResponse: "Haha! Haba chairman, no sink my display unit! Pay {counter} make you test am for your bathroom."
          },
          {
            id: "party_rush",
            label: "🎉 Weekend Beach Party Urgency",
            playerText: "Beach party starts in 2 hours for Ilashe. Give me {price} make I zoom off.",
            discountPct: 0.40,
            sellerResponse: "Go turn up with the sound! Pay {counter} and carry the vibe go."
          }
        ]
      },
      {
        id: "solar_inverter",
        name: "3.5kVA Hybrid Solar Inverter System",
        desc: "Pure Sine Wave, German high-frequency transformer with MPPT solar charge controller. 24V system.",
        askingPrice: 450000,
        floorPrice: 285000,
        marketFairPrice: 335000,
        icon: "☀️",
        isOriginal: true,
        authBadgeText: "★ GERMAN HIGH-EFFICIENCY MPPT SPEC",
        dialogue: {
          greetings: [
            "Distinguished customer! 3.5kVA Hybrid Solar Inverter System! Pure Sine Wave, MPPT solar charge controller, 10-year design life! Say goodbye to blackouts!",
            "Senior Advocate! Cut your electricity bill to zero! High-voltage hybrid inverter with lithium battery communication! Check specs!"
          ],
          playerOfferLines: [
            "Chief, MPPT voltage range is 145V, not 500V high-voltage. Fair valuation na {offer}.",
            "Oga, solar installation and battery pack go cost me millions. Subsidize this inverter at {offer}.",
            "Distinguished seller, official corporate transfer ready right now at {offer}.",
            "I dey pay {offer} instant bank transfer for this hybrid solar inverter."
          ],
          grumblingCounter: [
            "Distinguished buyer, lithium compatibility and high-frequency copper transformer cost real Euro. Last price na {counter}.",
            "Pure Sine Wave protect all delicate appliances in your home. Bottom price na {counter}.",
            "I give you 2-year warranty card with engineer callout! Give me {counter}."
          ],
          softenedCounter: [
            "Alright boss, because you want stable 24/7 solar light for your home, take am for {counter}.",
            "Good choice. Solar investment pays for itself. Pay {counter}.",
            "Drop {counter} make boys crate the inverter with user manual and mounting bracket."
          ],
          insults: [
            "Chineke! Are you pricing high-voltage solar hybrid inverter or car battery charger?!",
            "Comot for my office! If you no get funds for solar, continue buying petrol in darkness!",
            "Do you know the cost of German MPPT chips?! Don't mock green energy!"
          ],
          acceptedDeal: [
            "Deal sealed! When NEPA strike darkness tonight, your house go shine like palace! Congratulations!",
            "Energy independence achieved! Chief Obinna stands behind your warranty! Inverter is yours!",
            "Receipt stamped! 2-year manufacturer guarantee valid nationwide!"
          ],
          walkAwayCallback: [
            "Distinguished sir! Hold on! Don't go back to darkness and generator noise! Come take am for {counter}!",
            "Oga wait! Petrol price is climbing tomorrow, secure your solar inverter for {counter}!",
            "Chairman wait! Let's settle this hybrid inverter at {counter}!"
          ],
          walkAwayLost: [
            "Safe journey! When generator petrol finish at 2 AM, remember Chief Obinna!",
            "Waka go, hybrid solar inverter no be for people wey love blackouts!",
            "Next client please!"
          ],
          playerWalkAway: "This solar inverter system cost pass my budget abeg. I dey waka pass.",
          tactics: {
            fault_find: {
              playerText: "Wait o Chief, let me inspect the terminal block and cooling fan vents! The fan grille get small dent and MPPT label is basic!",
              successText: "Distinguished engineer! You inspect terminal blocks? Okay, I drop am to {counter}.",
              backfireText: "Tufiakwa! Disrespecting certified German-spec hybrid solar transformer?! Price don reach {counter}!",
              failText: "Flawless PCB board, dual high-speed ball-bearing fans, zero defect! Shift!"
            },
            sweet_talk: {
              playerText: "Chief Obinna Solar! You be the green energy pioneer of West Africa! Give a fellow visionary a solid deal.",
              sellerResponse: "Distinguished customer! I appreciate clients with green energy vision! I grant you discount!"
            },
            fake_call: {
              playerText: "*(Puts phone to ear)* Hello? Engineer, you say that solar distributor in Trade Fair complex get this exact hybrid inverter cheaper? I dey come...",
              sellerResponse: "Trade Fair distributors sell modified sine wave that burns fridge compressors! Take this pure sine wave for {counter}!"
            },
            show_cash: {
              playerText: "*(Shows corporate transfer authorization)* Instant transfer authorization ready for this 3.5kVA hybrid inverter. Close now or I waka!",
              agreedResponse: "Corporate transfer approved! Boys, crate the inverter and sign the 2-year warranty card!",
              rejectResponse: "Keep your money! Premium hybrid solar technology no be distress sale!"
            }
          }
        },
        haggleDialogues: [
          {
            id: "mppt_efficiency",
            label: "📊 Audit Solar MPPT Charge Efficiency",
            playerText: "Let me check the spec sheet: MPPT voltage range is 145V, not 500V high-voltage! Price should be {price}.",
            discountPct: 0.35,
            sellerResponse: "Distinguished engineer! 145V is rock solid for residential roofing! But I drop to {counter}."
          },
          {
            id: "battery_combo",
            label: "🔋 Promise Lithium Battery Next Week",
            playerText: "Give me good deal on this inverter at {price}, next week I come back for 10kWh Lithium pack.",
            discountPct: 0.32,
            sellerResponse: "Long-term partnership! I accept your projection. Settle for {counter}."
          },
          {
            id: "corporate_transfer",
            label: "💼 Corporate Business Transfer",
            playerText: "Official corporate bank transfer right now with purchase order. Close at {price}.",
            discountPct: 0.38,
            sellerResponse: "Corporate paperwork approved! Transfer {counter} make we crate the unit."
          }
        ]
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
    desc: "Traffic is crawling at 5km/h. A street hawker taps your bus window holding ice-cold Lacasera and hot Gala.",
    options: [
      {
        text: "Buy Cold Drink & Gala",
        cost: 700,
        effect: "refresh",
        message: "Cold drink refreshed your soul! You arrive at the next market in high spirits (+15 Patience bonus)."
      },
      {
        text: "Endure the Lagos Heat",
        cost: 0,
        effect: "none",
        message: "You wiped sweat with your shirt. True street discipline (Saved cash)!"
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
        cost: -3000,
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
        text: "Take Quick Okada Motorcycle",
        cost: 1000,
        effect: "fast_transit",
        message: "Okada zoomed through Lagos traffic like an arrow! (Paid ₦1,000 fare, arrived in 3 minutes)."
      },
      {
        text: "Help Push the Danfo",
        cost: 0,
        effect: "tired",
        message: "You pushed the bus until it roared back to life. Hands dirty, but kept your cash!"
      }
    ]
  }
];

export function generateDynamicErrand(difficulty = "standard") {
  const scenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)];

  let itemCount = 3;
  if (difficulty === "quick") itemCount = 2;
  if (difficulty === "mega") itemCount = 4;

  const shuffledMarkets = [...MARKETS].sort(() => 0.5 - Math.random());
  const selectedMarkets = shuffledMarkets.slice(0, itemCount);

  let quests = [];
  let totalFloor = 0;
  let totalAsking = 0;

  selectedMarkets.forEach((m, idx) => {
    const randomItem = m.items[Math.floor(Math.random() * m.items.length)];
    totalFloor += randomItem.floorPrice;
    totalAsking += randomItem.askingPrice;

    const primarySeller = m.sellers ? m.sellers[0] : m.seller;

    quests.push({
      step: idx + 1,
      marketId: m.id,
      itemId: randomItem.id,
      itemName: randomItem.name,
      hint: `Acquire ${randomItem.name} from ${primarySeller.name} at ${m.name}.`,
      transitMsg: `Boarded transit to ${m.name}... Lagos street energy is 100%!`
    });
  });

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

export const SATURDAY_ERRAND = generateDynamicErrand("standard");
