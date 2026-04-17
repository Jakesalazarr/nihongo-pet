/* Pet state management */
var PetManager = {
  SK: 'np_pet',
  pet: null,

  TYPES: [
    { id: 'cat', name: 'Cat', nameJa: 'ねこ', emoji: '🐱', color: '#FFB7C5' },
    { id: 'dog', name: 'Dog', nameJa: 'いぬ', emoji: '🐶', color: '#FFDAB9' },
    { id: 'bunny', name: 'Bunny', nameJa: 'うさぎ', emoji: '🐰', color: '#E8D5F5' },
    { id: 'hamster', name: 'Hamster', nameJa: 'ハムスター', emoji: '🐹', color: '#FFE4B5' },
    { id: 'penguin', name: 'Penguin', nameJa: 'ペンギン', emoji: '🐧', color: '#B8D4E3' }
  ],

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      if (d) this.pet = JSON.parse(d);
    } catch(e) {}
    return this.pet;
  },

  save: function() {
    if (this.pet) {
      try { localStorage.setItem(this.SK, JSON.stringify(this.pet)); } catch(e) {}
    }
  },

  create: function(type, name) {
    this.pet = {
      type: type,
      name: name || 'Pet',
      createdAt: Date.now(),
      hunger: 100,
      thirst: 100,
      happiness: 100,
      cleanliness: 80,
      lastTick: Date.now(),
      level: 1,
      totalXP: 0,
      equipped: { hat: null, acc: null, body: null }
    };
    this.save();
    return this.pet;
  },

  tick: function() {
    if (!this.pet) return;
    var now = Date.now();
    var hours = (now - this.pet.lastTick) / 3600000;
    if (hours < 0.01) return;

    this.pet.hunger = Math.max(0, Math.round(this.pet.hunger - 3 * hours));
    this.pet.thirst = Math.max(0, Math.round(this.pet.thirst - 4 * hours));
    this.pet.happiness = Math.max(0, Math.round(this.pet.happiness - 2 * hours));
    this.pet.cleanliness = Math.max(0, Math.round(this.pet.cleanliness - 1 * hours));
    this.pet.lastTick = now;
    this.save();
  },

  getMood: function() {
    if (!this.pet) return 'happy';
    var avg = (this.pet.hunger + this.pet.thirst + this.pet.happiness + this.pet.cleanliness) / 4;
    if (avg >= 85) return 'ecstatic';
    if (avg >= 60) return 'happy';
    if (avg >= 40) return 'neutral';
    if (this.pet.hunger < 20 || this.pet.thirst < 20) return 'hungry';
    if (avg < 25) return 'sad';
    return 'neutral';
  },

  feed: function(stat, amount) {
    if (!this.pet) return;
    if (stat === 'hunger') this.pet.hunger = Math.min(100, this.pet.hunger + amount);
    else if (stat === 'thirst') this.pet.thirst = Math.min(100, this.pet.thirst + amount);
    else if (stat === 'happiness') this.pet.happiness = Math.min(100, this.pet.happiness + amount);
    else if (stat === 'cleanliness') this.pet.cleanliness = Math.min(100, this.pet.cleanliness + amount);
    this.save();
  },

  addXP: function(amount) {
    if (!this.pet) return;
    this.pet.totalXP += amount;
    this.pet.level = Math.max(1, Math.floor(Math.pow(this.pet.totalXP / 100, 0.6)) + 1);
    this.save();
  },

  equip: function(slot, itemId) {
    if (!this.pet) return;
    this.pet.equipped[slot] = itemId;
    this.save();
  },

  unequip: function(slot) {
    if (!this.pet) return;
    this.pet.equipped[slot] = null;
    this.save();
  },

  exists: function() { return !!this.pet; },

  getType: function() {
    if (!this.pet) return this.TYPES[0];
    for (var i = 0; i < this.TYPES.length; i++) {
      if (this.TYPES[i].id === this.pet.type) return this.TYPES[i];
    }
    return this.TYPES[0];
  }
};
