/* Room state management */
var Room = {
  SK: 'np_room',
  data: null,

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      this.data = d ? JSON.parse(d) : { theme: 'default', placed: [] };
    } catch(e) { this.data = { theme: 'default', placed: [] }; }
  },

  save: function() {
    try { localStorage.setItem(this.SK, JSON.stringify(this.data)); } catch(e) {}
  },

  setTheme: function(themeId) {
    if (!this.data) this.load();
    this.data.theme = themeId;
    this.save();
  },

  placeFurniture: function(itemId, slot) {
    if (!this.data) this.load();
    this.data.placed = this.data.placed.filter(function(p) { return p.slot !== slot; });
    this.data.placed.push({ id: itemId, slot: slot });
    this.save();
  },

  removeFurniture: function(itemId) {
    if (!this.data) this.load();
    this.data.placed = this.data.placed.filter(function(p) { return p.id !== itemId; });
    this.save();
  },

  isPlaced: function(itemId) {
    if (!this.data) this.load();
    return this.data.placed.some(function(p) { return p.id === itemId; });
  },

  getPlaced: function() {
    if (!this.data) this.load();
    return this.data.placed;
  },

  getTheme: function() {
    if (!this.data) this.load();
    return getRoomTheme(this.data.theme);
  }
};
