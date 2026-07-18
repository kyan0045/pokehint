const assert = require("node:assert/strict");
const test = require("node:test");

const pokemon = require("../data/main/pokemon.json");
const legendary = require("../data/main/legendary.json");
const mythical = require("../data/main/mythical.json");
const ultraBeast = require("../data/main/ultra-beast.json");
const regional = require("../data/main/regional.json");
const event = require("../data/main/event.json");

test("canonical Pokémon names are unique", () => {
  const normalizedNames = pokemon.map((name) => name.toLowerCase());
  assert.equal(new Set(normalizedNames).size, normalizedNames.length);
});

test("special rarity names are present in the canonical data", () => {
  const canonicalNames = new Set(pokemon.map((name) => name.toLowerCase()));

  for (const names of [legendary, mythical, ultraBeast, regional, event]) {
    for (const name of names) {
      assert.ok(canonicalNames.has(name.toLowerCase()), `${name} is not canonical`);
    }
  }
});

test("language mappings round-trip", () => {
  for (const language of ["english", "japanese", "german", "french"]) {
    const forward = require(`../data/languages/english-to-language/${language}.json`);
    const reverse = require(`../data/languages/language-to-english/${language}.json`);

    for (const [englishName, translatedName] of Object.entries(forward)) {
      assert.equal(
        reverse[translatedName],
        englishName,
        `${language} mapping does not round-trip for ${englishName}`
      );
    }
  }
});
