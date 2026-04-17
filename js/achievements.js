/* Achievement system */
var Achievements = {
  SK: 'np_ach',
  unlocked: {},

  BADGES: [
    { id: 'first_word', name: 'First Step', emoji: '🌱', desc: 'Study your first word', coins: 10 },
    { id: 'ten_words', name: 'Getting Started', emoji: '📖', desc: 'Review 10 words', coins: 20 },
    { id: 'fifty_words', name: 'Scholar', emoji: '🎓', desc: 'Review 50 words', coins: 30 },
    { id: 'hundred_words', name: 'Bookworm', emoji: '📚', desc: 'Review 100 words', coins: 50 },
    { id: 'perfect_session', name: 'Perfect!', emoji: '💯', desc: 'Get 100% in a session', coins: 25 },
    { id: 'three_streak', name: 'On Fire', emoji: '🔥', desc: '3-day study streak', coins: 20 },
    { id: 'seven_streak', name: 'Dedicated', emoji: '⭐', desc: '7-day study streak', coins: 40 },
    { id: 'first_purchase', name: 'Shopper', emoji: '🛍️', desc: 'Buy your first item', coins: 10 },
    { id: 'feed_pet', name: 'Caretaker', emoji: '🍙', desc: 'Feed your pet', coins: 10 },
    { id: 'full_belly', name: 'Full & Happy', emoji: '😋', desc: 'Max out hunger stat', coins: 15 },
    { id: 'first_outfit', name: 'Fashionista', emoji: '👒', desc: 'Dress up your pet', coins: 15 },
    { id: 'first_furniture', name: 'Decorator', emoji: '🪴', desc: 'Place furniture', coins: 15 },
    { id: 'five_mastered', name: 'Memory Pro', emoji: '🧠', desc: 'Master 5 words', coins: 25 },
    { id: 'twenty_mastered', name: 'Word Wizard', emoji: '🪄', desc: 'Master 20 words', coins: 40 },
    { id: 'pet_level_5', name: 'Growing Up', emoji: '🌟', desc: 'Reach pet level 5', coins: 30 },
    { id: 'pet_level_10', name: 'Best Friends', emoji: '💕', desc: 'Reach pet level 10', coins: 50 }
  ],

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      this.unlocked = d ? JSON.parse(d) : {};
    } catch(e) { this.unlocked = {}; }
  },

  save: function() {
    try { localStorage.setItem(this.SK, JSON.stringify(this.unlocked)); } catch(e) {}
  },

  unlock: function(id) {
    if (this.unlocked[id]) return null;
    var badge = null;
    for (var i = 0; i < this.BADGES.length; i++) {
      if (this.BADGES[i].id === id) { badge = this.BADGES[i]; break; }
    }
    if (!badge) return null;
    this.unlocked[id] = { at: Date.now() };
    if (badge.coins) Economy.earn(badge.coins);
    this.save();
    return badge;
  },

  isUnlocked: function(id) { return !!this.unlocked[id]; },

  check: function() {
    var results = [];
    var st = SRS.stats || {};
    var tr = st.totalReviews || 0;
    var streak = (st.streak && st.streak.count) || 0;

    if (tr >= 1) { var b = this.unlock('first_word'); if (b) results.push(b); }
    if (tr >= 10) { var b = this.unlock('ten_words'); if (b) results.push(b); }
    if (tr >= 50) { var b = this.unlock('fifty_words'); if (b) results.push(b); }
    if (tr >= 100) { var b = this.unlock('hundred_words'); if (b) results.push(b); }
    if (streak >= 3) { var b = this.unlock('three_streak'); if (b) results.push(b); }
    if (streak >= 7) { var b = this.unlock('seven_streak'); if (b) results.push(b); }

    if (PetManager.pet) {
      if (PetManager.pet.level >= 5) { var b = this.unlock('pet_level_5'); if (b) results.push(b); }
      if (PetManager.pet.level >= 10) { var b = this.unlock('pet_level_10'); if (b) results.push(b); }
      if (PetManager.pet.hunger >= 100) { var b = this.unlock('full_belly'); if (b) results.push(b); }
    }

    var mastered = SRS.getMastered(ALL_WORDS).length;
    if (mastered >= 5) { var b = this.unlock('five_mastered'); if (b) results.push(b); }
    if (mastered >= 20) { var b = this.unlock('twenty_mastered'); if (b) results.push(b); }

    return results;
  }
};
