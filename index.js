const solveHint = require("./functions/solveHint.js");
const checkRarity = require("./functions/checkRarity.js");
const checkRaritySync = require("./functions/checkRaritySync.js");
const getName = require("./functions/getName.js");
const getImage = require("./functions/getImage.js");

const pokeHint = {
  solveHint,
  checkRarity,
  checkRaritySync,
  getName,
  getImage,
};

module.exports = pokeHint;
