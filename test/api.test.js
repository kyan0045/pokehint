const assert = require("node:assert/strict");
const test = require("node:test");

const { solveHint, checkRarity, checkRaritySync, getName, getImage } = require("..");

const fallbackImage =
  "https://res.cloudinary.com/dppthk8lt/image/upload/v1749666743/question_mkani5.png";

test("exports the public API", () => {
  assert.equal(typeof solveHint, "function");
  assert.equal(typeof checkRarity, "function");
  assert.equal(typeof checkRaritySync, "function");
  assert.equal(typeof getName, "function");
  assert.equal(typeof getImage, "function");
});

test("solveHint handles strings, message objects, and prefixed messages", () => {
  assert.deepEqual(solveHint("The pokémon is M_l__es."), ["Moltres"]);
  assert.deepEqual(solveHint({ content: "The pokémon is P_k_ch_." }), ["Pikachu"]);
  assert.deepEqual(solveHint("Hint: The pokémon is M_l__es."), ["Moltres"]);
});

test("solveHint preserves punctuation that is part of a name", () => {
  assert.deepEqual(solveHint("The pokémon is M_ss_ngN_.."), ["MissingNo."]);
});

test("solveHint validates input and removes duplicate results", () => {
  assert.throws(() => solveHint(null), /\[PokeHint\]/);
  assert.throws(() => solveHint(42), /\[PokeHint\]/);
  assert.deepEqual(solveHint("The pokémon is Rookidee."), ["Rookidee"]);
});

test("checkRarity returns every supported rarity", async () => {
  await assert.doesNotReject(() => checkRarity("Pikachu"));
  assert.equal(await checkRarity("Articuno"), "Legendary");
  assert.equal(await checkRarity("Mew"), "Mythical");
  assert.equal(await checkRarity("Nihilego"), "Ultra Beast");
  assert.equal(await checkRarity("Alolan Rattata"), "Regional");
  assert.equal(await checkRarity("Anniversary Wooloo"), "Event");
  assert.equal(await checkRarity(" Gigantamax Charizard "), "Gigantamax");
  assert.equal(await checkRarity("Pikachu"), "Regular");
});

test("checkRarity rejects invalid and unknown names consistently", async () => {
  await assert.rejects(checkRarity(), /\[PokeHint\]/);
  await assert.rejects(checkRarity("Not a Pokémon"), /Unable to identify/);
});

test("checkRaritySync returns directly and throws synchronously", () => {
  assert.equal(checkRaritySync("Moltres"), "Legendary");
  assert.equal(checkRaritySync(" Gigantamax Charizard "), "Gigantamax");
  assert.throws(() => checkRaritySync(), /\[PokeHint\]/);
  assert.throws(() => checkRaritySync("Not a Pokémon"), /Unable to identify/);
});

test("getName converts in both directions and honors inputLanguage", async () => {
  assert.equal(
    await getName({
      name: "Solosis",
      language: "French",
      inputLanguage: "English",
    }),
    "Nucléos"
  );
  assert.equal(
    await getName({
      name: "Nucléos",
      language: "English",
      inputLanguage: "French",
    }),
    "Solosis"
  );
  assert.equal(await getName({ name: "ho-oh", language: "english" }), "Ho-Oh");
});

test("getName rejects missing options and unsupported languages", async () => {
  await assert.rejects(getName(), /Could not find/);
  await assert.rejects(getName({ name: "Pikachu", language: "Spanish" }), /Unsupported language/);
  await assert.rejects(
    getName({ name: "Pikachu", inputLanguage: "Spanish" }),
    /Unsupported inputLanguage/
  );
});

test("getImage handles regular, shiny, Gigantamax, and fallback images", () => {
  assert.equal(getImage(" Charizard "), "https://cdn.poketwo.net/images/6.png");
  assert.equal(getImage("Charizard", true), "https://cdn.poketwo.net/shiny/6.png");
  assert.equal(getImage("Inteleon", false, true), "https://cdn.poketwo.net/images/10202.png");
  assert.equal(getImage("Not a Pokémon"), fallbackImage);
  assert.throws(() => getImage("  "), /\[PokeHint\]/);
});
