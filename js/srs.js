/* SRS Engine (SM-2) adapted for pet game */
var SRS = {
  SK: 'np_srs',
  STK: 'np_stats',
  cards: {},
  stats: null,

  load: function() {
    try {
      var c = localStorage.getItem(this.SK);
      if (c) this.cards = JSON.parse(c);
      var s = localStorage.getItem(this.STK);
      this.stats = s ? Object.assign(this._ds(), JSON.parse(s)) : this._ds();
    } catch(e) { this.stats = this._ds(); }
  },

  _ds: function() {
    return { totalReviews: 0, totalCorrect: 0, streak: { count: 0, lastDate: null }, bestStreak: 0, daily: {} };
  },

  save: function() {
    try {
      localStorage.setItem(this.SK, JSON.stringify(this.cards));
      localStorage.setItem(this.STK, JSON.stringify(this.stats));
    } catch(e) {}
  },

  getCard: function(id) {
    if (!this.cards[id]) this.cards[id] = { ef: 2.5, iv: 0, reps: 0, next: 0, rc: 0, cc: 0 };
    return this.cards[id];
  },

  review: function(id, rating) {
    var card = this.getCard(id);
    var today = new Date().toISOString().split('T')[0];
    card.rc++;
    this.stats.totalReviews++;
    if (!this.stats.daily[today]) this.stats.daily[today] = { r: 0, c: 0, n: 0 };
    this.stats.daily[today].r++;
    if (card.rc === 1) this.stats.daily[today].n++;

    var ok = rating >= 3;
    if (ok) {
      card.cc++; this.stats.totalCorrect++; this.stats.daily[today].c++;
      card.reps++;
      if (card.reps === 1) card.iv = 1;
      else if (card.reps === 2) card.iv = 6;
      else card.iv = Math.round(card.iv * card.ef);
      if (rating === 4) card.iv = Math.round(card.iv * 1.3);
    } else {
      card.reps = 0;
      card.iv = rating === 1 ? 0 : 1;
    }
    card.ef = Math.max(1.3, card.ef + (0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02)));
    card.next = Date.now() + card.iv * 86400000;

    this._streak();
    this.save();
    return ok;
  },

  _streak: function() {
    var today = new Date().toISOString().split('T')[0];
    if (this.stats.streak.lastDate === today) return;
    var yd = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    this.stats.streak.count = (this.stats.streak.lastDate === yd || this.stats.streak.count === 0) ? this.stats.streak.count + 1 : 1;
    this.stats.streak.lastDate = today;
    this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.streak.count);
  },

  getDue: function(words) { var n = Date.now(), s = this; return words.filter(function(w) { var c = s.cards[w.id]; return c && c.next <= n && c.rc > 0; }); },
  getNew: function(words) { var s = this; return words.filter(function(w) { return !s.cards[w.id] || s.cards[w.id].rc === 0; }); },
  getMastered: function(words) { var s = this; return words.filter(function(w) { var c = s.cards[w.id]; return c && c.iv >= 21; }); },
  getLearning: function(words) { var s = this; return words.filter(function(w) { var c = s.cards[w.id]; return c && c.rc > 0 && c.iv < 21; }); },

  buildDeck: function(words, size) {
    size = size || 20;
    var due = this.getDue(words);
    var fresh = this.getNew(words);
    var deck = [];
    var dc = Math.min(due.length, Math.ceil(size * 0.6));
    deck = deck.concat(this._sh(due).slice(0, dc));
    deck = deck.concat(this._sh(fresh).slice(0, size - deck.length));
    if (deck.length < size) {
      var ids = {}; deck.forEach(function(w) { ids[w.id] = 1; });
      var extra = words.filter(function(w) { return !ids[w.id]; });
      deck = deck.concat(this._sh(extra).slice(0, size - deck.length));
    }
    return this._sh(deck);
  },

  _sh: function(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; },

  todayStats: function() {
    var t = new Date().toISOString().split('T')[0], d = this.stats.daily[t];
    return d ? { reviews: d.r, correct: d.c, newCards: d.n, accuracy: d.r > 0 ? Math.round((d.c / d.r) * 100) : 0 } : { reviews: 0, correct: 0, newCards: 0, accuracy: 0 };
  }
};
