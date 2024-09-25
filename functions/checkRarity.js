// Importing the pokemon and their rarities
const pokemon = require("../data/main/pokemon.json");
const legendaries = require("../data/main/legendary.json");
const mythicals = require("../data/main/mythical.json");
const ultraBeasts = require("../data/main/ultra-beast.json");
const regionals = require("../data/main/regional.json");
const events = require("../data/main/event.json");
const gigantamaxes = require("../data/main/gigantamax.json");

// Convert arrays to Sets for faster lookups and reduced memory usage
const pokemonSet = new Set(pokemon.map(p => p.toLowerCase()));
const legendariesSet = new Set(legendaries.map(p => p.toLowerCase()));
const mythicalsSet = new Set(mythicals.map(p => p.toLowerCase()));
const ultraBeastsSet = new Set(ultraBeasts.map(p => p.toLowerCase()));
const regionalsSet = new Set(regionals.map(p => p.toLowerCase()));
const eventsSet = new Set(events.map(p => p.toLowerCase()));
const gigantamaxSet = new Set(gigantamaxes.map(p => p.toLowerCase()));


/**
 * Checks the rarity of a given Pokémon.
 * @param {string} pokemonName - The name of the Pokémon to check.
 * @returns {Promise<string>} The rarity of the Pokémon.
 * @throws {Error} If the Pokémon name is not recognized.
 */
async function checkRarity(pokemonName) {
  const normalizedName = pokemonName.toLowerCase();

  // Check if the Pokémon exists in our data
  if (!pokemonSet.has(normalizedName)) {
    throw new Error(
      `[PokeHint] Unable to identify the rarity of that Pokémon (${pokemonName}).`
    );
  }

  // Array of rarity checks, ordered from most rare to least rare
  const rarityChecks = [
    { set: legendariesSet, rarity: "Legendary" },
    { set: mythicalsSet, rarity: "Mythical" },
    { set: ultraBeastsSet, rarity: "Ultra Beast" },
    { set: regionalsSet, rarity: "Regional" },
    { set: eventsSet, rarity: "Event" },
    { set: gigantamaxSet, rarity: "Gigantamax" }
  ];

  // Check each rarity set
  for (const { set, rarity } of rarityChecks) {
    if (set.has(normalizedName)) {
      return rarity;
    }
  }

  // If not found in any special category, it's a regular Pokémon
  return "Regular";
}

module.exports = checkRarity;
