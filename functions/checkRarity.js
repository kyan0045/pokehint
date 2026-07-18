const checkRaritySync = require("./checkRaritySync.js");

/**
 * Checks the rarity of a given Pokémon.
 * @deprecated Use checkRaritySync() instead. This function is retained for Promise compatibility.
 * @param {string} pokemonName - The name of the Pokémon to check.
 * @returns {Promise<string>} The rarity of the Pokémon.
 * @throws {Error} If the Pokémon name is not recognized.
 */
async function checkRarity(pokemonName) {
  return checkRaritySync(pokemonName);
}

module.exports = checkRarity;
