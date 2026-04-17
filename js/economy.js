/* Economy / coin tracking */
var Economy = {
  SK: 'np_econ',
  data: null,

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      this.data = d ? JSON.parse(d) : this._default();
    } catch(e) { this.data = this._default(); }
  },

  _default: function() {
    return { coins: 0, totalEarned: 0, totalSpent: 0, lastDaily: null, dailyStreak: 0 };
  },

  save: function() {
    try { localStorage.setItem(this.SK, JSON.stringify(this.data)); } catch(e) {}
  },

  getCoins: function() { return this.data ? this.data.coins : 0; },

  earn: function(amount) {
    if (!this.data) this.load();
    this.data.coins += amount;
    this.data.totalEarned += amount;
    this.save();
    return this.data.coins;
  },

  spend: function(amount) {
    if (!this.data) this.load();
    if (this.data.coins < amount) return false;
    this.data.coins -= amount;
    this.data.totalSpent += amount;
    this.save();
    return true;
  },

  canAfford: function(amount) {
    return this.data && this.data.coins >= amount;
  },

  claimDaily: function() {
    if (!this.data) this.load();
    var today = new Date().toISOString().split('T')[0];
    if (this.data.lastDaily === today) return 0;

    var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (this.data.lastDaily === yesterday) {
      this.data.dailyStreak++;
    } else {
      this.data.dailyStreak = 1;
    }
    this.data.lastDaily = today;

    var bonus = 20 + Math.min(this.data.dailyStreak * 5, 50);
    this.earn(bonus);
    return bonus;
  },

  hasDailyBonus: function() {
    if (!this.data) this.load();
    var today = new Date().toISOString().split('T')[0];
    return this.data.lastDaily !== today;
  },

  earnFromStudy: function(rating) {
    var coins = 0;
    if (rating === 4) coins = 5;
    else if (rating === 3) coins = 3;
    else if (rating === 2) coins = 2;
    else coins = 0;
    if (coins > 0) this.earn(coins);
    return coins;
  }
};
