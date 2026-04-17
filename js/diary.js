/* Pet diary - cute daily messages */
var Diary = {
  SK: 'np_diary',
  entries: [],

  TEMPLATES: [
    "{name} practiced Japanese today and learned so much!",
    "{name} was so proud when you got all the answers right!",
    "{name} had a yummy meal and took a cozy nap afterwards.",
    "{name} danced around the room when you came to study!",
    "{name} is dreaming about all the new words you learned.",
    "{name} tried to read your textbook but fell asleep on it.",
    "{name} loves spending time studying with you!",
    "{name} made friends with the lucky cat on the shelf.",
    "{name} wants more snacks! Keep studying to earn coins!",
    "{name} is getting so smart from all this studying!",
    "{name} did a happy dance after today's quiz session!",
    "{name} wishes you a wonderful day full of learning!",
    "{name} curled up by the window and watched the cherry blossoms.",
    "{name} is counting all the words you've mastered so far!",
    "{name} says: がんばって！(Do your best!)"
  ],

  load: function() {
    try {
      var d = localStorage.getItem(this.SK);
      this.entries = d ? JSON.parse(d) : [];
    } catch(e) { this.entries = []; }
  },

  save: function() {
    try { localStorage.setItem(this.SK, JSON.stringify(this.entries)); } catch(e) {}
  },

  addEntry: function() {
    var today = new Date().toISOString().split('T')[0];
    if (this.entries.length > 0 && this.entries[0].date === today) return;

    var name = PetManager.pet ? PetManager.pet.name : 'Pet';
    var tmpl = this.TEMPLATES[Math.floor(Math.random() * this.TEMPLATES.length)];
    var msg = tmpl.replace(/\{name\}/g, name);

    this.entries.unshift({ date: today, msg: msg, mood: PetManager.getMood() });
    if (this.entries.length > 30) this.entries = this.entries.slice(0, 30);
    this.save();
  },

  getEntries: function() { return this.entries; }
};
