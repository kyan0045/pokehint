const pokemon = require("../data/main/pokemon.json");

/**
 * Solves a Pokémon hint by finding matching Pokémon names.
 * @param {string|Object} message - The hint message or message object.
 * @returns {string[]} An array of Pokémon names that match the hint.
 * @throws {Error} If the message object is undefined.
 */
function solveHint(message) {
  // Extract the content from the message object or use it directly if a string
  const str = typeof message === 'object' ? message.content : message;

  if (!str) {
    throw new Error("[PokeHint] The provided message or message content is undefined.");
  }

  // Split the message into words and identify the hint pattern
  const words = str.split(" ");
  let pokemonHint;

  if (words[0] === "The" && words[1] === "pokémon" && words[2] === "is") {
    // Extract the hint if the message follows a specific pattern
    pokemonHint = words.slice(3).join(" ");
  } else {
    // Otherwise, find the pattern starting from the last word containing "_"
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].includes("_") || i === words.length - 1) {
        pokemonHint = words.slice(i).join(" ");
        break;
      }
    }
  }

  // Convert the hint to a regex-like pattern
  const hintPattern = pokemonHint
    .replace(/\.([^.]*)$/, "$1")  // Remove trailing dot
    .replace(/[!\\]/g, "")  // Remove specific characters
    .replace(/_/g, ".");      // Replace underscore with a dot

  /**
   * Checks if a Pokémon name matches the hint pattern.
   * @param {string} name - The Pokémon name to check.
   * @param {string} pattern - The hint pattern to match against.
   * @returns {boolean} True if the name matches the pattern, false otherwise.
   */
  function matchesHint(name, pattern) {
    return name.length === pattern.length && 
           name.split('').every((char, i) => pattern[i] === "." || char.toLowerCase() === pattern[i].toLowerCase());
  }

  // Filter and return matching Pokémon names
  return pokemon.filter((p) => matchesHint(p, hintPattern));
}

module.exports = solveHint;
