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

/* Interaction reactions — triggered by user actions */
var PET_REACTIONS = {
  cat: {
    feed_food: [
      "Meow! Yummy! Thank you! 😋",
      "*nom nom* Purr~ so good! 💕",
      "Meow meow! My favorite! 🐱",
      "Mew~ my tummy is happy! 😸"
    ],
    feed_drink: [
      "Meow! So refreshing! 💧",
      "*lap lap lap* Purr~ 😸",
      "Mew~ thank you for the drink! 💕"
    ],
    furniture: [
      "Meow! New furniture! *sniffs* ✨",
      "Mew~ the room looks so pretty! 🏠",
      "*jumps on it* Meow! Mine! 🐱"
    ],
    outfit: [
      "Meow! Do I look cute? 👒",
      "*poses* Mew~ so fancy! ✨",
      "Purr~ I feel like a model! 💕"
    ],
    study_done: [
      "Meow! You're so smart! 📚",
      "Purr~ proud of you! ⭐",
      "Mew~ let's study again soon! 💪"
    ],
    daily: [
      "Meow! You're back! I missed you! 💕",
      "Mew~ welcome back! 🌸"
    ],
    bliss: [
      "Purr~ life is perfect~ 💕",
      "*curls up* Mew~ I love you~ 😸",
      "Meow~ I'm the happiest cat! 🌟"
    ]
  },
  cat2: {
    feed_food: [
      "Mrow! Delicious! Thank you! 😋",
      "*munch munch* Mrow~ yummy! 💕",
      "Mrow~ you're the best! 🐈‍⬛",
      "Mrow~ so full and happy! 😸"
    ],
    feed_drink: [
      "Mrow! Ahh~ refreshing! 💧",
      "*sip sip* Mrow~ lovely! 😸",
      "Mrow~ I was so thirsty! 💕"
    ],
    furniture: [
      "Mrow! Ooh what's this? ✨",
      "Mrow~ I love redecorating! 🏠",
      "*sits on it* Mrow! Comfy! 🐈‍⬛"
    ],
    outfit: [
      "Mrow! Am I fashionable? 👒",
      "*struts* Mrow~ fabulous! ✨",
      "Mrow~ runway ready! 💕"
    ],
    study_done: [
      "Mrow! Great studying! 📚",
      "Mrow~ you're getting better! ⭐",
      "Mrow~ keep it up! 💪"
    ],
    daily: [
      "Mrow! Finally! Where were you? 💕",
      "Mrow~ *stretches* oh hey~ 🌸"
    ],
    bliss: [
      "Purrrr~ so content~ 💕",
      "*kneads blanket* Mrow~ 😸",
      "Mrow~ couldn't be better! 🌟"
    ]
  },
  dog: {
    feed_food: [
      "Woof! Yummy! *tail wag* 😋",
      "*chomp chomp* Arf arf! 💕",
      "Woof woof! Best human ever! 🐕",
      "Arf~ belly so full! *rolls over* 😊"
    ],
    feed_drink: [
      "Woof! *slurp slurp* Nice! 💧",
      "*splash* Woof! Refreshing! 😊",
      "Arf! That hit the spot! 💕"
    ],
    furniture: [
      "Woof! New thing! *sniffs everywhere* ✨",
      "Arf! Our home is so nice! 🏠",
      "*circles around it* Woof! Love it! 🐕"
    ],
    outfit: [
      "Woof! Do I look good? 👒",
      "*spins around* Arf! I'm stylish! ✨",
      "Woof! Best dressed pup! 💕"
    ],
    study_done: [
      "Woof! You did amazing! 📚",
      "Arf! *jumps around* So proud! ⭐",
      "Woof woof! Again again! 💪"
    ],
    daily: [
      "WOOF!! YOU'RE HOME!! 💕💕",
      "*runs in circles* ARF ARF! 🌸"
    ],
    bliss: [
      "*happy panting* Life is good! 💕",
      "*tail wagging nonstop* Best day! 😊",
      "Woof! Happiest pup alive! 🌟"
    ]
  }
};

function getReaction(petType, action) {
  var reactions = PET_REACTIONS[petType] || PET_REACTIONS.cat;
  var msgs = reactions[action];
  if (!msgs || !msgs.length) return '';
  return msgs[Math.floor(Math.random() * msgs.length)];
}

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
