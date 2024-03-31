const getName = require("./functions/getName.js");
const solveHint = require("./functions/solveHint.js");
const getImage = require("./functions/getImage.js");
const checkRarity = require("./functions/checkRarity.js");

async function demo() {
  // Solving hints
  var hint = "The pokémon is Ch_r__n__r.";
  console.log(solveHint(hint)); // Logs 'Charmander'.

  // Checking the rarity
  var pokemonName = "Moltres";
  console.log(checkRarity(pokemonName)); // Logs Moltres' rarity: 'Legendary'.

  // Converting a name to a different language
  console.log(
    getName({
      name: "Charmander",
      language: "French",
      inputLanguage: "English",
    })
  ); // Logs the French name of Charmander: 'Salamèche'.

  // Getting the Pokétwo image sprite of a specified pokemon
  console.log(getImage("charmander", false)); // Logs 'https://cdn.poketwo.net/images/4.png'.
}

demo();
