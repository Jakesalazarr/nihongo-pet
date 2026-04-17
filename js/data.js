/* Combine all class notes chapters into one vocabulary pool */
var ALL_WORDS = [];
if (typeof CLASS_NOTES_DATA !== 'undefined') {
  for (var i = 0; i < CLASS_NOTES_DATA.length; i++) {
    ALL_WORDS = ALL_WORDS.concat(CLASS_NOTES_DATA[i].words);
  }
}
