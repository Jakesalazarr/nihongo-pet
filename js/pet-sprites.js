/* Sprite data + Pet AI speech system */

var SPRITE_DATA = {
  cat: {
    src: 'sprites/cat.png',
    sheetW: 256, sheetH: 192,
    frameW: 64, frameH: 64, scale: 2,
    rows: { idle: 0, eat: 1, sleep: 2 },
    frameCounts: { idle: 4, eat: 4, sleep: 4 }
  },
  cat2: {
    src: 'sprites/cat2.png',
    sheetW: 256, sheetH: 188,
    frameW: 64, frameH: 64, scale: 2,
    rows: { idle: 0, eat: 1, sleep: 2 },
    frameCounts: { idle: 4, eat: 4, sleep: 4 }
  },
  dog: {
    src: 'sprites/dog.png',
    sheetW: 640, sheetH: 64,
    frameW: 64, frameH: 64, scale: 2,
    rows: { idle: 0 },
    frameCounts: { idle: 10 }
  }
};

/* Pet-specific speech based on need and urgency */
var PET_SPEECH = {
  cat: {
    food: {
      warn: ["Meow~ food please! 🍙", "Mew... getting hungry~ 😿"],
      crit: ["MEOW!! I'm starving! 😭", "Mew mew! Feed me NOW! 🆘"]
    },
    water: {
      warn: ["Meow~ water please! 💧", "Mew... so thirsty~ 😿"],
      crit: ["MEOW!! I need water! 😭", "Mew mew! Thirsty!! 🆘"]
    },
    play: {
      warn: ["Meow~ play with me? 🎯", "Mew... I'm bored~ 😿"],
      crit: ["MEOW!! I'm so lonely! 😭", "Mew... don't forget me! 💔"]
    },
    happy: ["Purr~ 💕", "Nyaa~ I'm happy! 😸", "Purr purr~ 🐱"]
  },
  cat2: {
    food: {
      warn: ["Mrow~ hungry! 🍙", "Mew... feed me? 😿"],
      crit: ["MROW!! Starving!! 😭", "Mew mew mew! Food! 🆘"]
    },
    water: {
      warn: ["Mrow~ thirsty! 💧", "Mew... water? 😿"],
      crit: ["MROW!! So thirsty! 😭", "Mew! Water NOW! 🆘"]
    },
    play: {
      warn: ["Mrow~ bored! 🎯", "Mew... lonely~ 😿"],
      crit: ["MROW!! Play with me! 😭", "Mew... I miss you! 💔"]
    },
    happy: ["Purrrr~ 💕", "Mrow~ content! 😸", "Purr~ 🐈‍⬛"]
  },
  dog: {
    food: {
      warn: ["Woof! Food please! 🍙", "Whine~ hungry! 🥺"],
      crit: ["WOOF WOOF! Starving!! 😭", "Arf arf!! Feed me! 🆘"]
    },
    water: {
      warn: ["Woof! Water! 💧", "Whine~ thirsty! 🥺"],
      crit: ["WOOF!! I need water! 😭", "Arf!! So thirsty! 🆘"]
    },
    play: {
      warn: ["Woof woof! Play? 🎯", "Whine~ bored! 🥺"],
      crit: ["WOOF!! Play with me! 😭", "Whiiine~ I'm lonely! 💔"]
    },
    happy: ["Woof! *tail wag* 💕", "Arf arf! 😊", "Happy panting~ 🐕"]
  }
};

function getPetSpeech(petType, urgentNeed) {
  var speech = PET_SPEECH[petType] || PET_SPEECH.cat;

  // No urgent need — say something happy (or nothing)
  if (!urgentNeed) {
    var mood = PetManager.getMood();
    if (mood === 'ecstatic' || mood === 'happy') {
      var msgs = speech.happy;
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
    return '';
  }

  // Pick message based on urgency level
  var category = speech[urgentNeed.label];
  if (!category) return '';

  var level = urgentNeed.val < 20 ? 'crit' : 'warn';
  var msgs = category[level];
  return msgs[Math.floor(Math.random() * msgs.length)];
}
