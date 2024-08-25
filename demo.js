const getName = require("./functions/getName.js");
const solveHint = require("./functions/solveHint.js");
const getImage = require("./functions/getImage.js");
const checkRarity = require("./functions/checkRarity.js");

async function demo() {
  // Solving hints
  var hint = "The pokémon is M_l__es.";
  console.log(solveHint(hint)); // Logs 'Moltres'.

  // Checking the rarity
  var pokemonName = "Moltres";
  console.log(checkRarity(pokemonName)); // Logs Moltres' rarity: 'Legendary'.

  // Converting a name to a different language
  console.log(
    await getName({
      name: "Moltres",
      language: "French",
      inputLanguage: "English",
    })
  ); // Logs the French name of Charmander: 'Sulfura'.

  // Getting the Pokétwo image sprite of a specified pokemon
  console.log(getImage("Moltres", false)); // Logs 'https://cdn.poketwo.net/images/164.png'.
  console.log(getImage("Moltres", true)); // Logs 'https://cdn.poketwo.net/shiny/164.png'.
}

demo();
