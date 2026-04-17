/* Inventory management */
var Inventory = {
  SK: 'np_inv',
  data: null,

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      this.data = d ? JSON.parse(d) : { food: {}, drinks: {}, furniture: {}, outfits: {} };
    } catch(e) { this.data = { food: {}, drinks: {}, furniture: {}, outfits: {} }; }
  },

  save: function() {
    try { localStorage.setItem(this.SK, JSON.stringify(this.data)); } catch(e) {}
  },

  buy: function(item, category) {
    if (!this.data) this.load();
    if (!Economy.canAfford(item.price)) return false;
    Economy.spend(item.price);
    if (category === 'food' || category === 'drinks') {
      this.data[category][item.id] = (this.data[category][item.id] || 0) + 1;
    } else {
      this.data[category][item.id] = 1;
    }
    this.save();
    return true;
  },

  useItem: function(itemId, category) {
    if (!this.data) this.load();
    if (!this.data[category] || !this.data[category][itemId]) return false;
    this.data[category][itemId]--;
    if (this.data[category][itemId] <= 0) delete this.data[category][itemId];
    this.save();
    return true;
  },

  owns: function(itemId, category) {
    if (!this.data) this.load();
    return !!(this.data[category] && this.data[category][itemId]);
  },

  getQty: function(itemId, category) {
    if (!this.data) this.load();
    return (this.data[category] && this.data[category][itemId]) || 0;
  },

  getOwned: function(category) {
    if (!this.data) this.load();
    var items = [];
    var cat = this.data[category] || {};
    for (var id in cat) {
      if (cat[id] > 0) {
        var item = getShopItem(id);
        if (item) items.push({ item: item, qty: cat[id] });
      }
    }
    return items;
  },

  getOwnedConsumables: function() {
    return this.getOwned('food').concat(this.getOwned('drinks'));
  }
};
