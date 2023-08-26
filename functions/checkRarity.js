async function checkRarity(pokemonName) {
  const pokemon = require("../data/pokemon.json");
  const legendaries = require("../data/legendary.json");
  const mythicals = require("../data/mythical.json");
  const ultra_beasts = require("../data/ultra-beast.json");
  const regional = require("../data/regional.json");
  const event = require("../data/event.json");

  if (!pokemon.includes(pokemonName)) {
    throw new Error(`[PokeHint] Unable to identify the rarity of that pokemon (${pokemonName}).`);
  }
  
  if (legendaries.includes(pokemonName)) return "Legendary";
  if (mythicals.includes(pokemonName)) return "Mythical";
  if (ultra_beasts.includes(pokemonName)) return "Ultra Beast";
  if (regional.includes(pokemonName)) return "Regional";
  if (event.includes(pokemonName)) return "Event";

  if (pokemon.includes(pokemonName)) return "Regular";
}

module.exports = checkRarity;
