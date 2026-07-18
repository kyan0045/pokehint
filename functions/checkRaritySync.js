// Import the Pokémon and their rarities.
const pokemon = require("../data/main/pokemon.json");
const legendaries = require("../data/main/legendary.json");
const mythicals = require("../data/main/mythical.json");
const ultraBeasts = require("../data/main/ultra-beast.json");
const regionals = require("../data/main/regional.json");
const events = require("../data/main/event.json");
const gigantamaxes = require("../data/main/gigantamax.json");

// Convert arrays to Sets for fast, case-insensitive lookups.
const pokemonSet = new Set(pokemon.map((name) => name.toLowerCase()));
const rarityChecks = [
  { set: new Set(legendaries.map((name) => name.toLowerCase())), rarity: "Legendary" },
  { set: new Set(mythicals.map((name) => name.toLowerCase())), rarity: "Mythical" },
  { set: new Set(ultraBeasts.map((name) => name.toLowerCase())), rarity: "Ultra Beast" },
  { set: new Set(regionals.map((name) => name.toLowerCase())), rarity: "Regional" },
  { set: new Set(events.map((name) => name.toLowerCase())), rarity: "Event" },
  { set: new Set(gigantamaxes.map((name) => name.toLowerCase())), rarity: "Gigantamax" },
];
const gigantamaxSet = rarityChecks[5].set;

/**
 * Checks the rarity of a given Pokémon synchronously.
 * @param {string} pokemonName - The name of the Pokémon to check.
 * @returns {string} The rarity of the Pokémon.
 * @throws {Error} If the Pokémon name is not recognized.
 */
function checkRaritySync(pokemonName) {
  if (typeof pokemonName !== "string" || !pokemonName.trim()) {
    throw new Error("[PokeHint] A valid Pokémon name is required.");
  }

  const normalizedName = pokemonName.trim().toLowerCase();

  if (!pokemonSet.has(normalizedName) && !gigantamaxSet.has(normalizedName)) {
    throw new Error(`[PokeHint] Unable to identify the rarity of that Pokémon (${pokemonName}).`);
  }

  for (const { set, rarity } of rarityChecks) {
    if (set.has(normalizedName)) {
      return rarity;
    }
  }

  return "Regular";
}

module.exports = checkRaritySync;
