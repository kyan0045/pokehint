async function solveHint(message) {
  // Importing all possible pokemon
  const pokemon = require("../data/main/pokemon.json");

  // Determining which part of the message is the actual hint
  if (message.content) str = message.content;
  if (message && !message.content) str = message;
  if (!message)
    throw new Error("[PokeHint] The message object provided is undefined.");
  const words = str.split(" ");
  let wordCount = 0;
  if (words[0] === "The" && words[1] === "pokémon" && words[2] === "is") {
    for (let i = 3; i < words.length; i++) {
      wordCount++;
    }
  } else {
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].includes("_") || words[i] == words[words.length - 1]) {
        wordCount++;
      } else {
        break;
      }
    }
  }
  let PokemonWords = words.slice(-wordCount).join(" ");

  // Converting the hint to the matching pattern
  const pattern1 = PokemonWords.replace(/\!/, "");
  const pattern2 = pattern1.replace(/\.([^.]*)$/, "$1");
  const pattern3 = pattern2.replace(/\\/g, "");
  const hint = pattern3.replace(/_/g, ".");

  // Defining of the matching functions
  function matchesHint(name, hint) {
    if (name.length !== hint.length) return false;
    for (let i = 0; i < name.length; i++) {
      if (hint[i] !== "." && name[i].toLowerCase() !== hint[i].toLowerCase()) {
        return false;
      }
    }
    return true;
  }

  // Matching the hint to (a) possible pokemon(s)
  let matches = pokemon.filter((p) => matchesHint(p, hint));
  return matches;
}

module.exports = solveHint;
