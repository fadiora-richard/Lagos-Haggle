"""
haggle_engine.py - Option B: Python Core Negotiation Logic & Terminal CLI

Use this script to test, simulate, and balance the haggling algorithm
independently of the browser UI.
"""

import sys
import random
from dataclasses import dataclass
from typing import Optional, List, Dict, Tuple

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def format_naira(amount: float) -> str:
    try:
        return f"₦{int(round(amount)):,}"
    except UnicodeEncodeError:
        return f"NGN {int(round(amount)):,}"

def parse_amount(val_str: str) -> Optional[int]:
    if not val_str:
        return None
    val_str = val_str.strip().lower()
    for ch in ["₦", "$", "#", ",", " "]:
        val_str = val_str.replace(ch, "")
    if val_str.endswith("k"):
        try:
            return int(round(float(val_str[:-1]) * 1000))
        except ValueError:
            return None
    if val_str.endswith("m"):
        try:
            return int(round(float(val_str[:-1]) * 1000000))
        except ValueError:
            return None
    try:
        val = int(round(float(val_str)))
        return val if val > 0 else None
    except ValueError:
        return None

@dataclass
class MarketItem:
    id: str
    name: str
    desc: str
    asking_price: int
    floor_price: int
    market_fair_price: int
    is_original: bool = False

@dataclass
class Seller:
    name: str
    market: str
    base_patience: int = 100
    patience_loss_per_offer: int = 12
    insult_tolerance_ratio: float = 0.65
    callback_chance: float = 0.75
    insults: List[str] = None
    grumbles: List[str] = None
    agreed_lines: List[str] = None
    callbacks: List[str] = None

@dataclass
class DripPresetPy:
    id: str
    name: str
    quote_mult: float = 1.0
    patience_shield: float = 1.0
    base_patience_mod: int = 0
    advantage: str = ""
    disadvantage: str = ""
    callback_chance: float = 0.75
    sweet_talk_gain: int = 22
    concession_bonus: float = 0.0
    agbero_toll: int = 500
    perk: str = ""

DRIP_PRESETS_PY = [
    DripPresetPy(
        id="market_soldier",
        name="Market Soldier (Street Veteran)",
        quote_mult=1.10,
        patience_shield=1.25,
        base_patience_mod=0,
        advantage="Lowest opening quote (+10%), 25% slower patience loss, ₦200 Agbero toll",
        disadvantage="Show Cash fails on luxury items, high-end sellers start with lower patience",
        callback_chance=0.85,
        sweet_talk_gain=24,
        concession_bonus=0.0,
        agbero_toll=200,
        perk="Lowest quote markup (+10%), high patience defense, and ₦200 Agbero toll."
    ),
    DripPresetPy(
        id="ijgb",
        name="IJGB / Diaspora Returnee",
        quote_mult=1.80,
        patience_shield=0.85,
        base_patience_mod=0,
        advantage="95% Walkaway Callback rate, +45% Show Cash closing power",
        disadvantage="Opening quotes inflated by +80% (Maga tax), lowballing causes double patience drain",
        callback_chance=0.95,
        sweet_talk_gain=16,
        concession_bonus=0.0,
        agbero_toll=1500,
        perk="95% Walkout Callback & +45% Show Cash power. But opening quotes are +80% higher."
    ),
    DripPresetPy(
        id="student",
        name="Student on a Budget",
        quote_mult=1.20,
        patience_shield=1.0,
        base_patience_mod=0,
        advantage="Sweet Talk gives +38 patience, lowballs cost 45% less patience (forgiveness)",
        disadvantage="Show Cash laughed off on luxury goods, sellers ignore walkouts (only 45% callback)",
        callback_chance=0.45,
        sweet_talk_gain=38,
        concession_bonus=0.0,
        agbero_toll=200,
        perk="Sweet Talk gives +38 patience & lowballs are forgiven. But walkouts are ignored (45%)."
    ),
    DripPresetPy(
        id="corporate",
        name="Island Banker (9-to-5er)",
        quote_mult=1.45,
        patience_shield=1.0,
        base_patience_mod=-15,
        advantage="Sellers slash prices 15% faster per round due to lunch-hour urgency, +20% Show Cash credibility",
        disadvantage="Opening quote has +45% salary tax, starts with -15 patience (rushed clock), ₦800 Agbero toll",
        callback_chance=0.75,
        sweet_talk_gain=20,
        concession_bonus=0.15,
        agbero_toll=800,
        perk="Sellers drop prices 15% faster per round. But starts with -15 patience & +45% quote."
    )
]

CURRENT_DRIP_PY = DRIP_PRESETS_PY[0]

class NegotiationEnginePy:
    def __init__(self, item: MarketItem, seller: Seller, drip: DripPresetPy = None):
        self.item = item
        self.seller = seller
        self.drip = drip or CURRENT_DRIP_PY
        self.opening_price = int(round((item.asking_price * self.drip.quote_mult) / 500) * 500)
        self.current_seller_price = self.opening_price
        self.floor_price = item.floor_price

        base_p = seller.base_patience + self.drip.base_patience_mod
        if self.drip.id == "market_soldier" and item.is_original and item.asking_price >= 35000:
            base_p -= 15
        self.patience = max(25, min(100, base_p))
        self.patience_shield = self.drip.patience_shield
        self.rounds = 0
        self.status = "negotiating" # negotiating, agreed, lost, walked_away
        self.agreed_price: Optional[int] = None
        self.last_player_offer: Optional[int] = None
        self.can_attempt_callback = True
        self.used_moves = set()
        self.chaos_triggered = False

    def use_special_move(self, move_id: str) -> Tuple[str, str, int]:
        if move_id in self.used_moves:
            return "error", "Already used at this stall!", self.current_seller_price
        self.used_moves.add(move_id)

        if move_id == "sweet_talk":
            gain = self.drip.sweet_talk_gain
            self.patience = min(100, self.patience + gain)
            line = f"Aww, chairman/mama smiled! (+{gain}% Patience)"
            if self.drip.id == "student":
                line = f"Mama/Seller sighed sympathetically: 'Eyah, student boy! Take small discount!' (+{gain}% Patience)"
            elif self.drip.id == "ijgb":
                line = f"Seller teased your diaspora phonetics: 'Speak Pidgin jare!' (+{gain}% Patience)"
            return "sweet_talk", line, self.current_seller_price
        elif move_id == "fault_find":
            if self.item.is_original:
                price_hike = max(1500, int(round((self.current_seller_price * 0.14) / 500) * 500))
                self.current_seller_price += price_hike
                self.patience = max(0, self.patience - int(round(25 / self.patience_shield)))
                return "fault_find_backfire", f"BACKFIRE! Disrespecting genuine original material insulted the seller! Price HIKE to {format_naira(self.current_seller_price)} (-25% Patience)!", self.current_seller_price
            elif random.random() < 0.85:
                drop = int((self.current_seller_price - self.floor_price) * 0.30)
                self.current_seller_price = max(int(self.floor_price * 1.05), self.current_seller_price - drop)
                return "fault_find", f"Loose thread spotted! Concession granted, price dropped to {format_naira(self.current_seller_price)}.", self.current_seller_price
            else:
                self.patience = max(0, self.patience - 15)
                return "fault_find", "Seller got defensive! 'Commot here, na original!' (-15% Patience)", self.current_seller_price
        elif move_id == "fake_call":
            bluff_factor = 0.45 if self.drip.id == "market_soldier" else (0.25 if self.drip.id == "student" else 0.35)
            drop = int((self.current_seller_price - self.floor_price) * bluff_factor)
            self.current_seller_price = max(int(self.floor_price * 1.06), self.current_seller_price - drop)
            return "fake_call", f"Bluff worked! Seller panicked and dropped to {format_naira(self.current_seller_price)}!", self.current_seller_price
        elif move_id == "show_cash":
            target = int(self.floor_price * 1.08)
            thresh_mult = 1.25
            succ_chance = 0.60
            if self.drip.id == "ijgb":
                thresh_mult = 1.45
                succ_chance = 0.95
            elif self.drip.id == "market_soldier" and self.item.is_original and self.item.asking_price >= 35000:
                thresh_mult = 1.05
                succ_chance = 0.25
            elif self.drip.id == "student" and self.item.asking_price >= 20000:
                thresh_mult = 1.08
                succ_chance = 0.30
            elif self.drip.id == "corporate":
                thresh_mult = 1.35
                succ_chance = 0.80

            if self.current_seller_price <= target * thresh_mult or random.random() < succ_chance:
                self.status = "agreed"
                self.agreed_price = max(self.floor_price, target)
                msg = "Cash slapped on table! Deal sealed!"
                if self.drip.id == "ijgb":
                    msg = "Oga London slapped clean crisp notes! Seller's eyes lit up: 'Deal sealed, Chairman!'"
                elif self.drip.id == "corporate":
                    msg = "Instant corporate bank transfer alert pinged! Seller: 'Alert confirmed! Carry am go!'"
                return "agreed", msg, self.agreed_price
            else:
                self.patience = max(0, self.patience - 10)
                msg = "Seller: 'Keep your small change!' (-10% Patience)"
                if self.drip.id == "market_soldier" and self.item.is_original and self.item.asking_price >= 35000:
                    msg = "Seller sneered at crumpled notes: 'Oga street boy, this dirty change no fit buy original item!' (-10% Patience)"
                elif self.drip.id == "student" and self.item.asking_price >= 20000:
                    msg = "Seller laughed: 'Student, put that small feeding allowance back before you buy gala!' (-10% Patience)"
                return "show_cash", msg, self.current_seller_price
        return "error", "Unknown tactic", self.current_seller_price

    def submit_offer(self, offer: int) -> Tuple[str, str, int]:
        """
        Returns (action_type, dialogue_text, current_seller_price)
        action_type can be: 'agreed', 'insult', 'counter', 'lost'
        """
        if self.status != "negotiating":
            return "finished", "Negotiation concluded.", self.current_seller_price

        self.rounds += 1
        self.last_player_offer = offer

        # 1. Direct accept if player offers asking price or higher
        if offer >= self.current_seller_price:
            self.status = "agreed"
            self.agreed_price = self.current_seller_price
            return "agreed", "Deal sealed! Oya bring money!", self.agreed_price

        floor_ratio = offer / self.floor_price

        # 2. Insult check (audacious lowball)
        if floor_ratio < self.seller.insult_tolerance_ratio:
            raw_ded = random.randint(30, 38)
            if self.drip.id == "student":
                raw_ded = int(raw_ded * 0.55)
            elif self.drip.id == "ijgb":
                raw_ded = int(raw_ded * 1.45)
            self.patience = max(0, self.patience - int(round(raw_ded / self.patience_shield)))
            # Minimal drop
            drop = int((self.current_seller_price - self.floor_price) * 0.03)
            self.current_seller_price = max(self.floor_price, self.current_seller_price - drop)
            
            if self.patience <= 0:
                self.status = "lost"
                return "lost", "Market don close for you! Commot for my front!", self.current_seller_price

            insult = random.choice(self.seller.insults or [
                "Chineke God! Which kind bad morning be this?! You wan close my shop?!"
            ])
            return "insult", insult, self.current_seller_price

        # 3. Near-floor fair deal acceptance
        if floor_ratio >= 1.08:
            accept_chance = 0.4 + (offer - self.floor_price) / (self.current_seller_price - self.floor_price)
            if random.random() < accept_chance or self.rounds >= 4:
                self.status = "agreed"
                self.agreed_price = offer
                return "agreed", "Oya, carry am go! You wicked for market!", self.agreed_price

        # 4. Standard counter-offer
        self.patience = max(0, self.patience - int(round(self.seller.patience_loss_per_offer / self.patience_shield)))
        if self.patience <= 0:
            self.status = "lost"
            return "lost", "I no fit talk again, headache don catch me. Shift!", self.current_seller_price

        margin = self.current_seller_price - self.floor_price
        concession = 0.28 + random.random() * 0.18 + self.drip.concession_bonus
        drop = max(500, int(margin * concession))
        self.current_seller_price = max(int(self.floor_price * 1.05), self.current_seller_price - drop)

        grumble = random.choice(self.seller.grumbles or [
            "Haba chairman, you wan kill person? Last price na {counter}."
        ]).replace("{counter}", format_naira(self.current_seller_price))

        return "counter", grumble, self.current_seller_price

    def walk_away(self) -> Tuple[bool, str, int]:
        """
        Returns (called_back, dialogue_text, new_seller_price)
        """
        if self.status != "negotiating":
            return False, "Already finished.", self.current_seller_price

        reasonable_offer = self.last_player_offer and self.last_player_offer >= self.floor_price * 0.72
        min_p = 10 if self.drip.id == "ijgb" else 20
        should_callback = (
            self.can_attempt_callback
            and self.patience >= min_p
            and reasonable_offer
            and random.random() <= self.drip.callback_chance
        )

        if should_callback:
            self.can_attempt_callback = False
            floor_target = int(self.floor_price * (1.04 + random.random() * 0.08))
            self.current_seller_price = min(
                self.current_seller_price - 500,
                max(floor_target, int((self.current_seller_price + self.last_player_offer) / 2))
            )
            msg = random.choice(self.seller.callbacks or [
                "Customer! Hey! Where you dey go? Oya come back! Take am for {counter}!"
            ])
            if self.drip.id == "ijgb":
                msg = "Chai! Oga London! Brother wait now! No waka go! Settle for {counter} make we close deal!"
            msg = msg.replace("{counter}", format_naira(self.current_seller_price))
            return True, msg, self.current_seller_price
        else:
            self.status = "walked_away"
            msg = "Waka pass! Bad belle person, market never open you don come disturb person!"
            if self.drip.id == "student":
                msg = "Eyah, student pocket don dry. Go back to campus my pikin, market no be for you today."
            return False, msg, self.current_seller_price

    def evaluate_deal(self) -> Dict:
        """EA FC Transfer Market evaluation breakdown"""
        if self.status != "agreed" or self.agreed_price is None:
            return {}

        savings = self.opening_price - self.agreed_price
        max_possible = self.opening_price - self.floor_price
        efficiency = max(0.0, min(1.0, savings / max_possible)) if max_possible > 0 else 0.0

        if efficiency >= 0.88:
            grade, title = "A+", "Senior Street Veteran / Oga Boss"
        elif efficiency >= 0.74:
            grade, title = "A", "Sharp Lagosian / Master Haggler"
        elif efficiency >= 0.55:
            grade, title = "B+", "Market Wise / Solid Trader"
        elif efficiency >= 0.38:
            grade, title = "B", "Average Bargainer"
        elif efficiency >= 0.20:
            grade, title = "C", "Ajebutter / Soft Life"
        else:
            grade, title = "F", "Pure Mugu / JJC (Journey Just Coming)"

        return {
            "grade": grade,
            "title": title,
            "opening_price": self.opening_price,
            "agreed_price": self.agreed_price,
            "floor_price": self.floor_price,
            "money_saved": savings,
            "savings_percent": round((savings / self.opening_price) * 100),
            "rounds": self.rounds,
            "remaining_patience": self.patience
        }


# Quick CLI Demo
# Lagos Markets & Items Database for Python CLI
MARKETS_PY = [
    {
        "id": "yaba",
        "name": "Yaba Market (Tejuosho)",
        "seller": Seller(
            name="Bros Emeka",
            market="Yaba Market",
            base_patience=100,
            patience_loss_per_offer=12,
            insult_tolerance_ratio=0.65,
            callback_chance=0.80,
            insults=[
                "Chineke God! Which kind bad morning be this?! You wan close my shop?!",
                "Commot for my front! I be your age mate? You think say na dustbin I pick am from?!",
                "Mcheww! Dey go find your size for ground floor, don't waste my breath!"
            ],
            grumbles=[
                "Haba chairman, you wan kill person? Last price na {counter}.",
                "Abeg reason with me. Dollar don rise! Last price na {counter}.",
                "I get family to feed o! Lowest I fit do na {counter}."
            ],
            callbacks=[
                "Customer! Hey! Where you dey go? Oya come back! Take am for {counter}!",
                "Brother wait! No vex, market na negotiation. Pay {counter} make you carry am!"
            ]
        ),
        "items": [
            MarketItem("denim_jacket", "Vintage UK Oversized Denim Jacket", "Grade-1 Okrika from UK bale", 28000, 9000, 13000, is_original=False),
            MarketItem("chelsea_boots", "Italian Leather Chelsea Boots", "Clean suede finish, crepe sole", 36000, 14000, 18500, is_original=True),
            MarketItem("vintage_tee", "90s Heavyweight Graphic Tee", "Single stitch, washed fade", 15000, 4500, 7000, is_original=False)
        ]
    },
    {
        "id": "balogun",
        "name": "Balogun Island Market",
        "seller": Seller(
            name="Mama Nkechi",
            market="Balogun Island",
            base_patience=110,
            patience_loss_per_offer=10,
            insult_tolerance_ratio=0.60,
            callback_chance=0.85,
            insults=[
                "Mbanu! God forbid! You want to insult my ancestors with this price?!",
                "Tufiakwa! Even my younger apprentice will slap your face for this offer!",
                "Ewo! Go buy leaf wear if you don't have money for real fabric!"
            ],
            grumbles=[
                "My handsome child, school fees have gone up! Last price na {counter}.",
                "Look at the texture! High grade wax! Last price na {counter}.",
                "I am doing you favor because you remind me of my brother. Drop {counter}."
            ],
            callbacks=[
                "Wait! My child, don't walk into the sun! Come back, take it for {counter}!",
                "Customer! Don't go to those fake sellers down the road! Take {counter}!"
            ]
        ),
        "items": [
            MarketItem("dutch_wax", "6 Yards Real Dutch Wax (Hollandis)", "Authentic wax print, heavy cotton", 42000, 16000, 22000, is_original=True),
            MarketItem("george_fabric", "Gold-Threaded Indian George Wrapper", "Intricate embroidery with beads", 55000, 22000, 31000, is_original=True),
            MarketItem("silk_scarf", "Italian Silk Scarf & Turbans", "Lustrous designer pattern", 12000, 3800, 5500, is_original=False)
        ]
    },
    {
        "id": "computer_village",
        "name": "Otigba Computer Village (Ikeja)",
        "seller": Seller(
            name="Engr. Chidi Tech",
            market="Computer Village",
            base_patience=90,
            patience_loss_per_offer=15,
            insult_tolerance_ratio=0.75,
            callback_chance=0.65,
            insults=[
                "Bros, dey play! Charger alone cost pass the money you dey call!",
                "Oga shift! Go Otigba bridge go buy refurbished dummy carton!",
                "Chai! You want make custom duty swallow my capital?!"
            ],
            grumbles=[
                "Chief, clearance cost at wharf killed us. Bottom line na {counter}.",
                "I give you 6 months receipt guarantee! Last price na {counter}.",
                "No be China copy, original follow-come! Drop {counter}."
            ],
            callbacks=[
                "Chairman hold on! Otigba boys dey tricky. Come back make I give you for {counter}!",
                "Boss wait! No enter rain! Take am for {counter}!"
            ]
        ),
        "items": [
            MarketItem("iphone_12", "iPhone 12 128GB (Factory Unlocked)", "Clean battery health 89%, True Tone active", 185000, 110000, 135000, is_original=True),
            MarketItem("power_bank", "20,000mAh Dual USB-C Fast Charger", "Heavyweight lithium polymer battery", 32000, 12000, 16000, is_original=False),
            MarketItem("airpods_pro", "AirPods Pro (2nd Gen ANC)", "Active Noise Cancellation, serial number checks out", 48000, 15000, 23000, is_original=False)
        ]
    },
    {
        "id": "mile12",
        "name": "Mile 12 Food Market",
        "seller": Seller(
            name="Alhaji Danladi",
            market="Mile 12",
            base_patience=95,
            patience_loss_per_offer=11,
            insult_tolerance_ratio=0.62,
            callback_chance=0.70,
            insults=[
                "Subhanallah! Aboki, are you pricing sweet yam or dry firewood?!",
                "Wallahi you want me to incur debt for truck diesel?!",
                "Walahi talahi, this your price cannot even pay motor boy!"
            ],
            grumbles=[
                "Haba oga, fuel price for trailer from Kano is high. Last price na {counter}.",
                "Look how fresh! Direct from farm this morning. Pay {counter}.",
                "I give you wholesale rate because of market opening. Drop {counter}."
            ],
            callbacks=[
                "Oga customer! Don't go outside where dust will spoil the food! Take am for {counter}!",
                "Chairman wait! Come back make boys tie the bag for you at {counter}!"
            ]
        ),
        "items": [
            MarketItem("yam_tubers", "5 Giant Abuja White Tubers", "Massive, dry, zero rot yams", 30000, 14000, 18000, is_original=True),
            MarketItem("foreign_rice", "50kg Bag 'Special Foreign' Rice", "Re-bagged local parboiled rice", 78000, 48000, 56000, is_original=False),
            MarketItem("basket_tomatoes", "Big Raffia Basket Jos Tomatoes", "Plump, deep-red firm tomatoes", 25000, 11000, 15000, is_original=True)
        ]
    },
    {
        "id": "alaba",
        "name": "Alaba International Market",
        "seller": Seller(
            name="Chief Uche Power",
            market="Alaba International",
            base_patience=100,
            patience_loss_per_offer=13,
            insult_tolerance_ratio=0.70,
            callback_chance=0.75,
            insults=[
                "Chineke Nna! Are you pricing original generator or electric kettle?!",
                "Look this boy o! Do you think I picked pure copper coil from gutter?!",
                "Commot for my warehouse! Go buy candle if you no get money for light!"
            ],
            grumbles=[
                "Chairman, dollar to naira at wharf killed us. Bottom line na {counter}.",
                "Look the weight! Pure copper coil heavy like rock. Last price na {counter}.",
                "I no dey sell fake things here. Drop {counter} make boys load am for your motor."
            ],
            callbacks=[
                "Chairman! Hold on! Where you dey waka go? Oya come back, take am for {counter}!",
                "Chief! Don't go outside to buy aluminum coil wey go burn tomorrow! Take {counter}!"
            ]
        ),
        "items": [
            MarketItem("lutian_gen", "Lutian 3.5kVA Pure Copper Generator", "100% pure copper coil windings", 320000, 195000, 235000, is_original=True),
            MarketItem("smart_tv_55", "55-Inch 4K 'Samsung' Curved TV", "Alaba custom casing, generic board", 240000, 135000, 165000, is_original=False),
            MarketItem("solar_inverter", "3.5kVA Hybrid Solar Inverter System", "German high-frequency MPPT controller", 450000, 285000, 335000, is_original=True)
        ]
    }
]

ROAD_HAZARDS_PY = [
    {
        "title": "Third Mainland Bridge Go-Slow!",
        "desc": "Traffic is crawling at 5km/h. A street hawker taps your bus window holding ice-cold Lacasera and hot Gala for ₦700.",
        "opt1": ("Buy Cold Drink & Gala (Pay ₦700)", 700, "refresh", "Cold drink refreshed your soul! Arrived with high morale (+15 Patience bonus)!"),
        "opt2": ("Endure the Lagos Heat (Save ₦700)", 0, "none", "You wiped sweat with shirt and kept your ₦700. Street discipline!")
    },
    {
        "title": "Ojuelegba Bus Stop Commotion!",
        "desc": "A suspicious guy in dark shades 'accidentally' bumps hard into you while boarding the Danfo!",
        "opt1": ("Keep Cash in Socks & Slap Hand Away", 0, "none", "Sharp street boy! Pickpocket's hand caught empty air. All cash 100% intact!"),
        "opt2": ("Check Pockets Frantically", 1500, "loss", "While checking, you noticed ₦1,500 transport change went missing! Lagos 101 lesson.")
    },
    {
        "title": "Mama's Surprise Mid-Trip Call!",
        "desc": "Your phone rings in the bus! It's Mama calling to check your location.",
        "opt1": ("Pick & Reassure Her: 'I dey on top the matter!'", -3000, "bonus", "Mama smiled! 'Good pikin! Your sister sent ₦3,000 transport bonus to your budget!'"),
        "opt2": ("Pretend Network is Cracking: 'Hello? Hello Mama?!'", 0, "none", "You ended call to avoid extra errand additions. Tactical retreat!")
    },
    {
        "title": "Danfo Radiator Overheat!",
        "desc": "The yellow bus breaks down with steam pouring from the hood! Driver shouts: 'Everybody come down make una push!'",
        "opt1": ("Take Quick Okada Motorcycle (Pay ₦1,000)", 1000, "none", "Okada zoomed through traffic like an arrow! Arrived in 3 minutes."),
        "opt2": ("Help Push the Danfo (Save ₦1,000)", 0, "none", "You pushed the bus until it started. Hands dirty, but ₦1,000 saved!")
    }
]

def play_stall(item: MarketItem, seller: Seller, drip: DripPresetPy = None, patience_bonus: int = 0) -> Tuple[bool, int, Dict]:
    print("\n" + "-" * 55)
    print(f"📍 STALL: {seller.name} ({seller.market})")
    print(f"📦 ITEM:  {item.name} {'[★ Certified Original]' if item.is_original else '[Grade Replica/Thrift]'}")
    print(f"💰 ASKING: {format_naira(item.asking_price)}")
    print("-" * 55)

    engine = NegotiationEnginePy(item, seller, drip)
    if patience_bonus > 0:
        engine.patience = min(100, engine.patience + patience_bonus)
        print(f"✨ Morale bonus applied! Starting Patience: {engine.patience}%")

    while engine.status == "negotiating":
        print(f"\n[Seller Patience: {engine.patience}% | Current Asking: {format_naira(engine.current_seller_price)}]")
        print("Options: (1) Counter Offer  (2) Accept Current Price  (3) Walk Away  (4) Street Tactic  (q) Cancel")
        choice = input("> ").strip().lower()

        if choice == "1":
            raw_input = input("Enter your counter-offer (e.g. 10k, 12,000, 15000): ").strip()
            offer_val = parse_amount(raw_input)
            if not offer_val:
                print("Invalid amount. You can type '10k', '12,000', '15000', etc.")
                continue
            act, text, price = engine.submit_offer(offer_val)
            print(f"\n🗣️ {seller.name}: \"{text}\"")
        elif choice == "2":
            engine.status = "agreed"
            engine.agreed_price = engine.current_seller_price
            print(f"\n🤝 You agreed to pay {format_naira(engine.agreed_price)}!")
            break
        elif choice == "3":
            called_back, text, new_price = engine.walk_away()
            print(f"\n🚶‍♂️ You turned to walk away...")
            print(f"🗣️ {seller.name}: \"{text}\"")
            if called_back:
                print("Accept this callback offer? (y/n)")
                ans = input("> ").strip().lower()
                if ans == "y":
                    engine.status = "agreed"
                    engine.agreed_price = new_price
                    break
                else:
                    print("You kept walking into the street.")
                    break
            else:
                break
        elif choice == "4":
            print("Choose Tactic: (a) 🍯 Sweet Talk  (b) 🔍 Inspect Fault  (c) 📞 Fake Call  (d) 💵 Show Cash")
            t_choice = input("> ").strip().lower()
            tac_map = {"a": "sweet_talk", "b": "fault_find", "c": "fake_call", "d": "show_cash"}
            if t_choice in tac_map:
                res_act, res_txt, res_price = engine.use_special_move(tac_map[t_choice])
                print(f"\n⚡ TACTIC RESULT: {res_txt}")
                if res_act == "agreed":
                    print(f"\n🤝 Deal agreed at {format_naira(engine.agreed_price)}!")
                    break
            else:
                print("Unknown tactic.")
        elif choice == "q":
            return False, 0, {}

    if engine.status == "agreed":
        evaluation = engine.evaluate_deal()
        print("\n" + "=" * 55)
        print(f"🏆 DEAL GRADE: {evaluation['grade']} - {evaluation['title']}")
        print(f"Agreed: {format_naira(evaluation['agreed_price'])} | Saved: {format_naira(evaluation['money_saved'])}")
        print("=" * 55)
        return True, engine.agreed_price, evaluation
    else:
        print("\n❌ Deal failed! No goods purchased.")
        return False, 0, {}

def play_campaign():
    print("\n" + "=" * 60)
    print("🧺 CHOOSE SATURDAY ERRAND DIFFICULTY:")
    print(" (1) 🥪 Quick Errand (2 Items)")
    print(" (2) 🧺 Standard Saturday (3 Items)")
    print(" (3) 🚚 Mega Owanbe Hustle (4 Items)")
    print(" (q) ✕ Cancel / Return to Main Menu")
    diff_input = input("> ").strip().lower()

    if diff_input == "q":
        print("Cancelled errand run. Returning to main menu.")
        return

    num_items = 3
    if diff_input == "1":
        num_items = 2
    elif diff_input == "3":
        num_items = 4

    shuffled_markets = list(MARKETS_PY)
    random.shuffle(shuffled_markets)
    selected_markets = shuffled_markets[:num_items]

    errands = []
    total_floor = 0
    total_asking = 0

    for m in selected_markets:
        chosen_item = random.choice(m["items"])
        total_floor += chosen_item.floor_price
        total_asking += chosen_item.asking_price
        errands.append((chosen_item, m["seller"], f"Entering transit to {m['name']}..."))

    # Dynamic tight budget formula
    budget = int(round((total_floor + (total_asking - total_floor) * 0.38) / 1000) * 1000)
    spent = 0
    purchases = []
    pending_patience_bonus = 0

    print("\n" + "=" * 60)
    print("👵🏾 MAMA'S SATURDAY ERRAND BRIEFING")
    print("=" * 60)
    print(f"Mama gave you {format_naira(budget)} CASH for {num_items} items.")
    print("'Listen to me well well! Go to the markets and bring back these items.'")
    print("'Whatever money you save from this budget is your POCKET MONEY!'")
    print("=" * 60)
    for idx, (it, sel, _) in enumerate(errands, 1):
        print(f" {idx}. {sel.market}: {it.name}")
    print("=" * 60)

    road_hazard = random.choice(ROAD_HAZARDS_PY)
    hazard_triggered = False

    for idx, (item, seller, transit_msg) in enumerate(errands, 1):
        print(f"\n🚌 [TRANSIT STEP {idx}/{num_items}]: {transit_msg}")
        print(f"Family Budget Remaining: {format_naira(budget - spent)}")

        # Road hazard triggers between stalls (after 1st stall)
        if idx == 2 and not hazard_triggered:
            hazard_triggered = True
            print("\n" + "!" * 55)
            print(f"⚠️ MID-TRIP LAGOS ROAD EVENT: {road_hazard['title']}")
            print(road_hazard["desc"])
            print(f" (1) {road_hazard['opt1'][0]}")
            print(f" (2) {road_hazard['opt2'][0]}")
            h_choice = input("> ").strip()
            chosen_opt = road_hazard["opt1"] if h_choice == "1" else road_hazard["opt2"]

            # Apply cost
            cost = chosen_opt[1]
            spent += cost
            print(f"\n👉 {chosen_opt[3]}")
            if chosen_opt[2] == "refresh":
                pending_patience_bonus = 15
            print("!" * 55)

        success = False
        while not success:
            success, paid, eval_res = play_stall(item, seller, drip=CURRENT_DRIP_PY, patience_bonus=pending_patience_bonus)
            pending_patience_bonus = 0
            if not success:
                print("\nQuit this errand run and return to menu? (y/n)")
                quit_ans = input("> ").strip().lower()
                if quit_ans == "y":
                    print("You left the Saturday errand and returned home.")
                    return
                print("Let's try negotiating again.")
            else:
                spent += paid
                purchases.append((item, paid, eval_res))
                print(f"✅ Acquired {item.name}! Remaining Budget: {format_naira(budget - spent)}")

    pocket_money = max(0, budget - spent)
    print("\n" + "=" * 60)
    print("🏠 RETURN HOME: MAMA'S FINAL INSPECTION")
    print("=" * 60)
    print(f"Initial Budget:      {format_naira(budget)}")
    print(f"Total Spent:         {format_naira(spent)}")
    print(f"POCKET MONEY KEPT:   {format_naira(pocket_money)}")
    print("-" * 60)

    original_count = sum(1 for it, _, _ in purchases if it.is_original)
    replica_count = len(purchases) - original_count
    print(f"AUTHENTICITY CHECK: ★ {original_count} Certified Original | {replica_count} Replica/Thrift")
    print("-" * 60)
    print("RECEIPTS:")
    for it, p, ev in purchases:
        auth_tag = "★ ORIGINAL" if it.is_original else "REPLICA"
        print(f" • {it.name} [{auth_tag}]: {format_naira(p)} (Grade: {ev.get('grade', 'B')})")
        if it.is_original:
            print(f"   👵🏾 Mama: \"Chai! 100% genuine original! You have good market eyes!\"")
        else:
            print(f"   👵🏾 Mama: \"Wait o... you bought clever replica for me! Well, at least the price was sweet!\"")
    print("-" * 60)

    save_ratio = pocket_money / budget if budget > 0 else 0
    if spent > budget:
        print("❌ MAMA VERDICT: F-TIER (Disowned from the Family)")
        print("\"You finished all the money and went into debt?! Pack your bag and sleep in the market!\"")
    elif save_ratio >= 0.38:
        print("🏆 MAMA VERDICT: S-TIER (Pride of the Ancestors)")
        print(f"\"Chai! My pikin! Blood of smart people dey run inside you! You saved {format_naira(pocket_money)}! Take extra ₦5k chop Shawarma!\"")
    elif save_ratio >= 0.24:
        print("🥇 MAMA VERDICT: A-TIER (Sharp Street Boy)")
        print(f"\"You try well well! You saved {format_naira(pocket_money)} for yourself. Good job!\"")
    elif save_ratio >= 0.12:
        print("🥈 MAMA VERDICT: B-TIER (Average Bargainer)")
        print(f"\"Hmm, at least you brought back {format_naira(pocket_money)} change. Next time squeeze them more!\"")
    elif pocket_money > 0:
        print("⚠️ MAMA VERDICT: C-TIER (Ajebutter / Soft Life Victim)")
        print(f"\"Only {format_naira(pocket_money)} remain?! Did they put charm in your eyes?!\"")
    else:
        print("❌ MAMA VERDICT: F-TIER (Disowned from the Family)")
        print("\"You didn't even bring 10 Naira change?! Pack your bag!\"")
    print("=" * 60)


def choose_drip():
    global CURRENT_DRIP_PY
    print("\n" + "=" * 65)
    print("👔 SELECT YOUR LAGOS MARKET DRIP:")
    print("=" * 65)
    for idx, preset in enumerate(DRIP_PRESETS_PY, 1):
        active_tag = " [CURRENT OUTFIT]" if preset.id == CURRENT_DRIP_PY.id else ""
        print(f" ({idx}) {preset.name}{active_tag}")
        print(f"     🟢 ADVANTAGE:    {preset.advantage}")
        print(f"     🔴 DISADVANTAGE: {preset.disadvantage}")
        print(f"     🏷️ Stats: Quote {preset.quote_mult}x | Patience Shield {preset.patience_shield}x | Callback {int(preset.callback_chance*100)}%")
        print()
    print(" (q) Keep Current Outfit")
    choice = input("> ").strip().lower()
    if choice in ["1", "2", "3", "4"]:
        CURRENT_DRIP_PY = DRIP_PRESETS_PY[int(choice) - 1]
        print(f"\n✅ Drip updated! You are now dressed as: {CURRENT_DRIP_PY.name}")


def show_tutorial():
    print("\n" + "=" * 65)
    print("🎓 LAGOS MARKET 101: STREET NEGOTIATION HANDBOOK")
    print("=" * 65)
    print("Welcome to Lagos! Here is how to survive and conquer the markets:\n")

    print("1. 🤝 THE GOLDEN RULE: NEVER ACCEPT THE FIRST PRICE")
    print(" • Opening quotes are ALWAYS inflated by 30% to 100%.")
    print(" • Type your counter-offer naturally: '10k', '12,500', '15000'.")
    print(" • Watch the Seller's Patience: Lowballing too audaciously will insult them.")
    print(" • If patience drops to 0%, the seller kicks you out of their stall!\n")

    print("2. 🚶‍♂️ THE LAGOS WALKOUT (WALK AWAY)")
    print(" • When a seller refuses to drop their price, try 'Walk Away'!")
    print(" • 75% of the time, the seller panics and yells: 'Customer wait! Come back!'")
    print(" • They will offer you their near-rock-bottom concession!\n")

    print("3. 🔍 STREET TACTICS & CONSEQUENCES")
    print(" • 🍯 Sweet Talk: Praise the seller to recover +22% to +35% patience.")
    print(" • 🔍 Inspect Fault:")
    print("    - On Replicas/Thrift: Spots loose thread or defect, dropping price ~30%.")
    print("    - ⚠️ On Certified Originals: BACKFIRES! Disrespecting original material")
    print("      deeply insults the seller, triggers an immediate PRICE HIKE, and slashes patience!")
    print(" • 📞 Fake Call: Bluff that a stall at the front is selling cheaper.")
    print(" • 💵 Show Cash: Slap raw Naira cash on the table for an instant close.\n")

    print("4. 👔 THE DRIP SYSTEM (PROS & CONS)")
    print(" • Market Soldier (Street Veteran):")
    print("    🟢 Advantage: Lowest opening quote (+10%), high patience defense, ₦200 Agbero toll.")
    print("    🔴 Disadvantage: Show Cash fails on luxury items, luxury sellers start skeptical.")
    print(" • IJGB / Diaspora Returnee:")
    print("    🟢 Advantage: 95% panicked Walkaway Callback, +45% Show Cash closing power.")
    print("    🔴 Disadvantage: Quotes inflated +80% (Maga tax), double patience drain on lowball.")
    print(" • Student on a Budget:")
    print("    🟢 Advantage: Sweet Talk gives +38 patience, lowballs forgiven (-45% loss).")
    print("    🔴 Disadvantage: Show Cash laughed off on luxury, walkouts ignored (45% callback).")
    print(" • Island Banker (9-to-5er):")
    print("    🟢 Advantage: Sellers slash prices 15% faster per round (lunch rush), +20% Show Cash.")
    print("    🔴 Disadvantage: +45% salary tax markup, starts with -15 patience (rushed clock).\n")

    print("5. 🧺 SATURDAY ERRAND (CAMPAIGN MODE)")
    print(" • Mama gives you a tight calculated budget for 2, 3, or 4 items.")
    print(" • Every single Naira you save is YOUR PERSONAL POCKET MONEY!")
    print(" • Beware of mid-trip road hazards (Gala hawkers, pickpockets, Danfo breakdown).")
    print(" • Return home for Mama's final authenticity inspection and EA FC grade!\n")
    print("=" * 65)
    input("Press Enter to return to main menu...")


if __name__ == "__main__":
    while True:
        print("\n" + "=" * 60)
        print("🇳🇬 LAGOS MARKET HAGGLE SIMULATOR")
        print("=" * 60)
        print("Choose Mode:")
        print(f" (1) Free Stall Practice (Quick Haggle) [Drip: {CURRENT_DRIP_PY.name.split(' ')[0]}]")
        print(" (2) 🧺 Saturday Errand Campaign Mode (Mama's Mission)")
        print(" (3) 📖 Street Guide / How to Play (Tutorial)")
        print(f" (4) 👔 Change Drip Outfit [Current: {CURRENT_DRIP_PY.name.split(' ')[0]}]")
        print(" (q) Exit Game")
        mode_choice = input("> ").strip().lower()

        if mode_choice == "1":
            test_m = MARKETS_PY[0]
            test_item = test_m["items"][0]
            test_seller = test_m["seller"]
            play_stall(test_item, test_seller, drip=CURRENT_DRIP_PY)
        elif mode_choice == "2":
            play_campaign()
        elif mode_choice == "3":
            show_tutorial()
        elif mode_choice == "4":
            choose_drip()
        elif mode_choice == "q":
            print("Good bye! See you in the market next time!")
            break

