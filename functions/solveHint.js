const pokemon = require("../data/main/pokemon.json");

/**
 * Solves a Pokémon hint by finding matching Pokémon names.
 * @param {string|Object} message - The hint message or message object.
 * @returns {string[]} An array of Pokémon names that match the hint.
 * @throws {Error} If the message or its content is not a non-empty string.
 */
function solveHint(message) {
  // Extract the content from the message object or use it directly if a string
  const str = message !== null && typeof message === "object" ? message.content : message;

  if (typeof str !== "string" || !str.trim()) {
    throw new Error("[PokeHint] The provided message or message content is undefined.");
  }

  const messagePrefix = "The pokémon is ";
  const prefixIndex = str.indexOf(messagePrefix);
  let pokemonHint;

  if (prefixIndex !== -1) {
    pokemonHint = str.slice(prefixIndex + messagePrefix.length);
  } else {
    const words = str.trim().split(/\s+/);
    // Preserve the existing fallback for messages that do not use the standard prefix.
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].includes("_")) {
        pokemonHint = words.slice(i).join(" ");
        break;
      }
    }

    if (!pokemonHint) {
      pokemonHint = str.trim();
    }
  }

  // Convert the hint to a character-by-character wildcard pattern.
  const hintPattern = pokemonHint
    .trim()
    .replace(/\.$/, "")
    .replace(/[!\\]/g, "")
    .replace(/_/g, ".");

  /**
   * Checks if a Pokémon name matches the hint pattern.
   * @param {string} name - The Pokémon name to check.
   * @param {string} pattern - The hint pattern to match against.
   * @returns {boolean} True if the name matches the pattern, false otherwise.
   */
  function matchesHint(name, pattern) {
    return (
      name.length === pattern.length &&
      name
        .split("")
        .every((char, i) => pattern[i] === "." || char.toLowerCase() === pattern[i].toLowerCase())
    );
  }

  // Filter and return matching Pokémon names
  return [...new Set(pokemon.filter((p) => matchesHint(p, hintPattern)))];
}

module.exports = solveHint;
