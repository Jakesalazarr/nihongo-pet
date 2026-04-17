/* ============================================================
   Shop Item Catalog  --  Nihongo Pet
   ============================================================ */

var SHOP_ITEMS = {

  /* ---------- FOOD (10) ---------- */
  food: [
    { id: "riceball", name: "Rice Ball", nameJa: "\u304A\u306B\u304E\u308A", emoji: "\uD83C\uDF59", price: 15, effect: { stat: "hunger", amount: 20 }, desc: "A classic triangle of happiness!", rarity: "common" },
    { id: "miso_soup", name: "Miso Soup", nameJa: "\u307F\u305D\u3057\u308B", emoji: "\uD83C\uDF5C", price: 20, effect: { stat: "hunger", amount: 25 }, desc: "Warm and comforting!", rarity: "common" },
    { id: "curry_rice", name: "Curry Rice", nameJa: "\u30AB\u30EC\u30FC\u30E9\u30A4\u30B9", emoji: "\uD83C\uDF5B", price: 30, effect: { stat: "hunger", amount: 35 }, desc: "Spicy, savory goodness!", rarity: "common" },
    { id: "ramen", name: "Ramen", nameJa: "\u30E9\u30FC\u30E1\u30F3", emoji: "\uD83C\uDF5C", price: 35, effect: { stat: "hunger", amount: 40 }, desc: "Slurp-worthy noodles!", rarity: "uncommon" },
    { id: "dango", name: "Dango", nameJa: "\u3060\u3093\u3054", emoji: "\uD83C\uDF61", price: 25, effect: { stat: "hunger", amount: 20, bonus: { stat: "happiness", amount: 10 } }, desc: "Sweet little dumplings!", rarity: "common" },
    { id: "cake_slice", name: "Cake Slice", nameJa: "\u30B1\u30FC\u30AD", emoji: "\uD83C\uDF70", price: 40, effect: { stat: "hunger", amount: 35, bonus: { stat: "happiness", amount: 5 } }, desc: "A fluffy strawberry slice!", rarity: "uncommon" },
    { id: "tempura", name: "Tempura", nameJa: "\u3066\u3093\u3077\u3089", emoji: "\uD83C\uDF64", price: 45, effect: { stat: "hunger", amount: 45 }, desc: "Crispy and golden!", rarity: "uncommon" },
    { id: "sushi_plate", name: "Sushi Plate", nameJa: "\u304A\u3059\u3057", emoji: "\uD83C\uDF63", price: 50, effect: { stat: "hunger", amount: 50 }, desc: "Fresh from the sea!", rarity: "uncommon" },
    { id: "bento_box", name: "Bento Box", nameJa: "\u304A\u3079\u3093\u3068\u3046", emoji: "\uD83C\uDF71", price: 60, effect: { stat: "hunger", amount: 55, bonus: { stat: "happiness", amount: 10 } }, desc: "A perfectly packed lunch!", rarity: "uncommon" },
    { id: "royal_feast", name: "Royal Feast", nameJa: "\u3054\u3061\u305D\u3046", emoji: "\uD83D\uDC51", price: 100, effect: { stat: "hunger", amount: 100, bonus: { stat: "happiness", amount: 20 } }, desc: "A feast fit for a king!", rarity: "rare" }
  ],

  /* ---------- DRINKS (8) ---------- */
  drinks: [
    { id: "water", name: "Water", nameJa: "\u304A\u307F\u305A", emoji: "\uD83D\uDCA7", price: 10, effect: { stat: "thirst", amount: 20 }, desc: "Pure and refreshing!", rarity: "common" },
    { id: "green_tea", name: "Green Tea", nameJa: "\u304A\u3061\u3083", emoji: "\uD83C\uDF75", price: 15, effect: { stat: "thirst", amount: 25 }, desc: "A soothing cup of tea!", rarity: "common" },
    { id: "juice_box", name: "Juice Box", nameJa: "\u30B8\u30E5\u30FC\u30B9", emoji: "\uD83E\uDDC3", price: 20, effect: { stat: "thirst", amount: 30 }, desc: "Fruity and fun!", rarity: "common" },
    { id: "milk", name: "Milk", nameJa: "\u304E\u3085\u3046\u306B\u3085\u3046", emoji: "\uD83E\uDD5B", price: 25, effect: { stat: "thirst", amount: 35 }, desc: "Creamy and wholesome!", rarity: "common" },
    { id: "ramune", name: "Ramune", nameJa: "\u30E9\u30E0\u30CD", emoji: "\uD83C\uDF76", price: 30, effect: { stat: "thirst", amount: 35, bonus: { stat: "happiness", amount: 5 } }, desc: "Pop the marble and enjoy!", rarity: "uncommon" },
    { id: "boba_tea", name: "Boba Tea", nameJa: "\u30BF\u30D4\u30AA\u30AB", emoji: "\uD83E\uDDCB", price: 40, effect: { stat: "thirst", amount: 40, bonus: { stat: "happiness", amount: 10 } }, desc: "Chewy pearls of joy!", rarity: "uncommon" },
    { id: "matcha_latte", name: "Matcha Latte", nameJa: "\u307E\u3063\u3061\u3083\u30E9\u30C6", emoji: "\uD83C\uDF75", price: 45, effect: { stat: "thirst", amount: 45, bonus: { stat: "happiness", amount: 5 } }, desc: "Frothy green perfection!", rarity: "uncommon" },
    { id: "sakura_drink", name: "Sakura Drink", nameJa: "\u3055\u304F\u3089\u30C9\u30EA\u30F3\u30AF", emoji: "\uD83C\uDF38", price: 80, effect: { stat: "thirst", amount: 100, bonus: { stat: "happiness", amount: 15 } }, desc: "Tastes like spring!", rarity: "rare" }
  ],

  /* ---------- FURNITURE (12) ---------- */
  furniture: [
    { id: "floor_cushion", name: "Floor Cushion", nameJa: "\u3056\u3076\u3068\u3093", emoji: "\uD83E\uDE91", price: 50, slot: "floor", desc: "A comfy zabuton for sitting.", rarity: "common" },
    { id: "small_lamp", name: "Small Lamp", nameJa: "\u30E9\u30F3\u30D7", emoji: "\uD83D\uDCA1", price: 60, slot: "shelf", desc: "A soft, warm glow.", rarity: "common" },
    { id: "potted_plant", name: "Potted Plant", nameJa: "\u306F\u3061\u3046\u3048", emoji: "\uD83E\uDEB4", price: 70, slot: "floor", desc: "A little green friend!", rarity: "common" },
    { id: "futon", name: "Futon", nameJa: "\u3075\u3068\u3093", emoji: "\uD83D\uDECF\uFE0F", price: 80, slot: "floor", desc: "Soft and fluffy dreams.", rarity: "common" },
    { id: "wall_scroll", name: "Wall Scroll", nameJa: "\u304B\u3051\u3058\u304F", emoji: "\uD83D\uDDBC\uFE0F", price: 90, slot: "wall", desc: "Elegant calligraphy art.", rarity: "uncommon" },
    { id: "bookshelf", name: "Bookshelf", nameJa: "\u307B\u3093\u3060\u306A", emoji: "\uD83D\uDCDA", price: 120, slot: "wall", desc: "Filled with manga!", rarity: "uncommon" },
    { id: "kotatsu", name: "Kotatsu", nameJa: "\u3053\u305F\u3064", emoji: "\uD83E\uDED5", price: 150, slot: "center", desc: "Warm and impossible to leave.", rarity: "uncommon" },
    { id: "lucky_cat", name: "Lucky Cat", nameJa: "\u307E\u306D\u304D\u306D\u3053", emoji: "\uD83D\uDC31", price: 180, slot: "shelf", desc: "Waves good fortune your way!", rarity: "uncommon" },
    { id: "fish_tank", name: "Fish Tank", nameJa: "\u3059\u3044\u305D\u3046", emoji: "\uD83D\uDC1F", price: 200, slot: "shelf", desc: "Watch the fish swim!", rarity: "uncommon" },
    { id: "bonsai_tree", name: "Bonsai Tree", nameJa: "\u307C\u3093\u3055\u3044", emoji: "\uD83C\uDF33", price: 220, slot: "floor", desc: "Tiny tree, big zen.", rarity: "uncommon" },
    { id: "cherry_blossom", name: "Cherry Blossom", nameJa: "\u3055\u304F\u3089", emoji: "\uD83C\uDF38", price: 300, slot: "floor", desc: "Petals fall like snow.", rarity: "rare" },
    { id: "koi_pond", name: "Koi Pond", nameJa: "\u3053\u3044\u306E\u3044\u3051", emoji: "\uD83C\uDF8F", price: 400, slot: "center", desc: "Peaceful splashing sounds.", rarity: "rare" }
  ],

  /* ---------- OUTFITS (10) ---------- */
  outfits: [
    { id: "red_bow", name: "Red Bow", nameJa: "\u3042\u304B\u3044\u30EA\u30DC\u30F3", emoji: "\uD83C\uDF80", price: 40, slot: "hat", cssClass: "has-red-bow", desc: "A cute ribbon for your pet!", rarity: "common" },
    { id: "straw_hat", name: "Straw Hat", nameJa: "\u3080\u304E\u308F\u3089\u307C\u3046\u3057", emoji: "\uD83D\uDC52", price: 60, slot: "hat", cssClass: "has-straw-hat", desc: "Ready for sunny adventures!", rarity: "common" },
    { id: "glasses", name: "Glasses", nameJa: "\u3081\u304C\u306D", emoji: "\uD83D\uDC53", price: 50, slot: "acc", cssClass: "has-glasses", desc: "Scholarly and stylish!", rarity: "common" },
    { id: "scarf", name: "Scarf", nameJa: "\u30DE\u30D5\u30E9\u30FC", emoji: "\uD83E\uDDE3", price: 70, slot: "acc", cssClass: "has-scarf", desc: "Warm and cozy!", rarity: "common" },
    { id: "bandana", name: "Bandana", nameJa: "\u30D0\u30F3\u30C0\u30CA", emoji: "\uD83C\uDF8C", price: 80, slot: "hat", cssClass: "has-bandana", desc: "A bold look!", rarity: "common" },
    { id: "tiny_backpack", name: "Tiny Backpack", nameJa: "\u3061\u3044\u3055\u3044\u30EA\u30E5\u30C3\u30AF", emoji: "\uD83C\uDF92", price: 120, slot: "body", cssClass: "has-backpack", desc: "Packed for an adventure!", rarity: "uncommon" },
    { id: "flower_wreath", name: "Flower Wreath", nameJa: "\u306F\u306A\u304B\u3093\u3080\u308A", emoji: "\uD83D\uDC90", price: 150, slot: "hat", cssClass: "has-flower-wreath", desc: "A crown of flowers!", rarity: "uncommon" },
    { id: "cape", name: "Cape", nameJa: "\u30DE\u30F3\u30C8", emoji: "\uD83E\uDDB8", price: 180, slot: "body", cssClass: "has-cape", desc: "Swoosh! So heroic!", rarity: "uncommon" },
    { id: "crown", name: "Crown", nameJa: "\u304A\u3046\u304B\u3093", emoji: "\uD83D\uDC51", price: 200, slot: "hat", cssClass: "has-crown", desc: "Royalty becomes you!", rarity: "rare" },
    { id: "kimono_sash", name: "Kimono Sash", nameJa: "\u304A\u3073", emoji: "\uD83D\uDC58", price: 250, slot: "body", cssClass: "has-kimono-sash", desc: "Elegant and traditional!", rarity: "rare" }
  ]
};

/* ---------- ROOM THEMES (4) ---------- */
var ROOM_THEMES = [
  { id: "default", name: "Cozy Room", nameJa: "\u304A\u3078\u3084", price: 0, desc: "A sweet pastel room.", colors: { wall: "#FFF0F5", floor: "#FFEEF2", accent: "#FFB7C5" } },
  { id: "tatami", name: "Tatami Room", nameJa: "\u305F\u305F\u307F\u3079\u3084", price: 300, desc: "Traditional Japanese style!", colors: { wall: "#FFF8E7", floor: "#E8DCC8", accent: "#C4A882" } },
  { id: "garden", name: "Garden", nameJa: "\u304A\u306B\u308F", price: 500, desc: "A peaceful outdoor garden.", colors: { wall: "#E8F5E9", floor: "#C8E6C9", accent: "#81C784" } },
  { id: "cafe", name: "Cafe", nameJa: "\u30AB\u30D5\u30A7", price: 400, desc: "A cozy coffee shop vibe.", colors: { wall: "#FFF3E0", floor: "#FFCCBC", accent: "#FFAB91" } }
];

/* ---------- HELPER FUNCTIONS ---------- */
function getShopItem(id) {
  var all = [].concat(SHOP_ITEMS.food, SHOP_ITEMS.drinks, SHOP_ITEMS.furniture, SHOP_ITEMS.outfits);
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}

function getRoomTheme(id) {
  for (var i = 0; i < ROOM_THEMES.length; i++) {
    if (ROOM_THEMES[i].id === id) return ROOM_THEMES[i];
  }
  return ROOM_THEMES[0];
}
