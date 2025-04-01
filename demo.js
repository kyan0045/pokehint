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
      name: "Solosis",
      language: "French",
      inputLanguage: "English",
    })
  ); // Logs the French name of Solosis: 'Nucléos'.

  // Getting the Pokétwo image sprite of a specified pokemon
  console.log(getImage("Charizard", false, false)); // Logs the regular image: 'https://cdn.poketwo.net/images/6.png'.
  console.log(getImage("Charizard", true, false)); // Logs the shiny image: 'https://cdn.poketwo.net/shiny/6.png'.
  console.log(getImage("Charizard", false, true)); // Logs the Gigantamax image: 'https://cdn.poketwo.net/images/10187.png'.
}

demo();
