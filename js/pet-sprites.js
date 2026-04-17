/* Sprite sheet metadata for ToffeeCraft pet assets */
var SPRITE_DATA = {
  cat: {
    src: 'sprites/cat.png',
    sheetW: 256, sheetH: 192,
    frameW: 64, frameH: 64,
    scale: 2,
    rows: { idle: 0, eat: 1, sleep: 2 },
    frameCounts: { idle: 4, eat: 4, sleep: 4 }
  },
  cat2: {
    src: 'sprites/cat2.png',
    sheetW: 256, sheetH: 188,
    frameW: 64, frameH: 64,
    scale: 2,
    rows: { idle: 0, eat: 1, sleep: 2 },
    frameCounts: { idle: 4, eat: 4, sleep: 4 }
  },
  dog: {
    src: 'sprites/dog.png',
    sheetW: 640, sheetH: 64,
    frameW: 64, frameH: 64,
    scale: 2,
    rows: { idle: 0 },
    frameCounts: { idle: 10 }
  }
};

/* Map mood to sprite animation row */
var MOOD_TO_ANIM = {
  ecstatic: 'idle',
  happy:    'idle',
  neutral:  'idle',
  hungry:   'eat',
  sad:      'idle',
  sleeping: 'sleep'
};

/* Nudge messages to encourage studying */
var NUDGE_MSGS = {
  hungry: [
    "I'm hungry! Study to earn coins! 🍙",
    "Feed me! Let's do a quiz! 📚",
    "My tummy is rumbling... quiz time? 🍱"
  ],
  sad: [
    "I miss you... let's study together! 💕",
    "Cheer me up with some flashcards! 📖",
    "I'm lonely... a quick quiz would help! 🌸"
  ],
  sleeping: [
    "Zzz... come back soon! 💤"
  ]
};

function getNudgeMsg(mood) {
  var msgs = NUDGE_MSGS[mood];
  if (!msgs) return '';
  return msgs[Math.floor(Math.random() * msgs.length)];
}
