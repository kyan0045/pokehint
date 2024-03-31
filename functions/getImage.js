async function getImage(pokemon, shiny) {
  const pokemonName = pokemon.toLowerCase();
  const shinyState = shiny ? true : false;

  if (!pokemonName)
    throw new Error(
      `[PokeHint] No pokemon name specified to get the image of. (${pokemonName})`
    );

  // Importing the images
  const images = require("../data/images/images.json");
  let image = images[pokemonName];
  if (!image)
    throw new Error(
      `[PokeHint] Unable to find an image for the Pokemon: ${pokemonName}`
    );

  // Check whether to get the shiny image or not
  if (shinyState == true) {
    image = image.replace("images", "shiny");
  }
  return image;
}

module.exports = getImage;
