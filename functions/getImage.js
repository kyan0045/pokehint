async function getImage(pokemon, shiny) {
  const pokemonName = pokemon.toLowerCase();
  const shinyState = shiny ? true : false;

  if (!pokemonName)
    throw new Error(
      `[PokeHint] No pokemon name specified to get the image of. (${pokemonName})`
    );

  // Importing the images
  const images = require("../data/images/images.json");
  const forms = require("../data/images/forms.json");
  const events = require("../data/images/events.json");

  let image = images[pokemonName];
  let formImage = forms[pokemonName];
  let eventImage = events[pokemonName];

  // Check and assign the first valid image
  image = image || formImage || eventImage;

  if (!image) {
    throw new Error(`[PokeHint] Unable to find an image for the Pokemon: ${pokemonName}`);
  }
  if (shinyState == true) {
    image = image.replace("images", "shiny");
  }
  return image;
}

module.exports = getImage;
