// Load the JSON files once when the module is loaded
const imagesRaw = require("../data/images/images.json");
const formsRaw = require("../data/images/forms.json");
const eventsRaw = require("../data/images/events.json");
const gigantamaxImagesRaw = require("../data/images/gigantamax.json");

// Convert object keys to lowercase for case-insensitive lookups
const images = Object.fromEntries(
  Object.entries(imagesRaw).map(([key, value]) => [key.toLowerCase(), value])
);
const forms = Object.fromEntries(
  Object.entries(formsRaw).map(([key, value]) => [key.toLowerCase(), value])
);
const events = Object.fromEntries(
  Object.entries(eventsRaw).map(([key, value]) => [key.toLowerCase(), value])
);
const gigantamaxImages = Object.fromEntries(
  Object.entries(gigantamaxImagesRaw).map(([key, value]) => [key.toLowerCase(), value])
);

/**
 * Retrieves the image URL for a given Pokémon.
 * @param {string} pokemon - The name of the Pokémon.
 * @param {boolean} [shiny=false] - Whether to get the shiny version of the Pokémon.
 * @param {boolean} [gigantamax=false] - Whether to get the Gigantamax version of the Pokémon.
 * @returns {Promise<string>} The URL of the Pokémon image.
 * @throws {Error} If no Pokémon name is specified or if no image is found.
 */
function getImage(pokemon, shiny = false, gigantamax = false) {
  if (typeof pokemon !== "string" || !pokemon.trim()) {
    throw new Error("[PokeHint] Invalid or empty Pokémon name specified.");
  }

  const pokemonName = pokemon.toLowerCase();

  // Access the preloaded image data
  const imageOptions = [
    gigantamax ? gigantamaxImages[`gigantamax ${pokemonName}`] : undefined,
    images[pokemonName],
    forms[pokemonName],
    events[pokemonName],
  ];

  // Find the first valid image
  const image = imageOptions.find((img) => img !== undefined);

  if (!image) {
    console.log(
      `[PokeHint] Unable to find an image for the Pokémon: ${pokemon}`
    );
    return "https://res.cloudinary.com/dppthk8lt/image/upload/v1749666743/question_mkani5.png";
  }

  // Replace 'images' with 'shiny' in the URL if shiny version is requested
  return shiny ? image.replace("images", "shiny") : image;
}

module.exports = getImage;