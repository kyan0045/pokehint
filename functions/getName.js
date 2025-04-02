const fs = require("fs").promises;
const path = require("path");

// Cache the name mappings to improve performance
let cachedNameMappings = null;

/**
 * Loads and caches name mappings for different languages.
 * @returns {Promise<Object>} A promise that resolves to the name mappings object.
 * @throws {Error} If there's an error loading the name mappings.
 */
async function loadNameMappings() {
  if (cachedNameMappings) {
    return cachedNameMappings;
  }

  try {
    const languages = ["english", "japanese", "german", "french"];
    const nameMappings = {};

    await Promise.all(
      languages.map(async (language) => {
        const [data1, data2] = await Promise.all([
          fs.readFile(
            path.join(
              __dirname,
              "../data/languages/english-to-language/",
              `${language}.json`
            ),
            "utf8"
          ),
          fs.readFile(
            path.join(
              __dirname,
              "../data/languages/language-to-english/",
              `${language}.json`
            ),
            "utf8"
          ),
        ]);

        nameMappings[language] = {
          ...JSON.parse(data1),
          ...JSON.parse(data2),
        };
      })
    );

    cachedNameMappings = nameMappings;
    return nameMappings;
  } catch (error) {
    throw new Error(`[PokeHint] Error loading name mappings: ${error.message}`);
  }
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The input string.
 * @returns {string} The input string with its first letter capitalized.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Detects the language of a Pokémon name by checking the name mappings.
 * @param {string} name - The Pokémon name to detect the language of.
 * @param {Object} nameMappings - The loaded name mappings.
 * @param {Array<string>} languages - The list of languages to check.
 * @returns {Promise<string>} The detected language, or "english" if not found.
 */
async function detectLanguage(name, nameMappings, languages) {
  const lowercaseName = name.toLowerCase();
  for (const language of languages) {
    if (nameMappings[language] && nameMappings[language][lowercaseName]) {
      return language;
    }
  }
  return "english"; // Default to English if language is not detected
}

/**
 * Converts a Pokémon name from one language to another.
 * @param {Object} params - The parameters for name conversion.
 * @param {string} params.name - The Pokémon name to convert.
 * @param {string} [params.language] - The target language (default: "random").
 * @param {string} [params.inputLanguage] - The input language (default: "English").
 * @returns {Promise<string>} A promise that resolves to the converted Pokémon name.
 * @throws {Error} If the name cannot be converted or if the input is invalid.
 */
async function getName({ name, language, inputLanguage }) {
  if (!name) {
    throw new Error("[PokeHint] Could not find a Pokémon name to convert.");
  }

  // Load name mappings
  const nameMappings = await loadNameMappings();

  // Determine languages to use
  const languages = ["english", "japanese", "german", "french"];
  const languageToUse =
    language === "random"
      ? languages[Math.floor(Math.random() * languages.length)]
      : language || "random";
  const inputLanguageToUse =
    (await detectLanguage(name, nameMappings, languages))

  // Helper function for name conversion
  const convertName = (fromLang, toLang, pokemonName) => {
    const lowercaseName = pokemonName.toLowerCase();
    const fromLangLower = fromLang.toLowerCase();
    if (toLang === "random") {
      toLang = languages[Math.floor(Math.random() * languages.length)];
    }
    const toLangLower = toLang.toLowerCase();
    if (toLangLower === fromLangLower) {
      return pokemonName;
    }

    const nameKey = nameMappings[fromLangLower][lowercaseName];
    if (!nameKey) {
      console.error(
        `[PokeHint] Unable to find a conversion from ${fromLang} to ${toLang} for the Pokémon name: ${pokemonName}`
      );
      return pokemonName;
    }
    return nameMappings[toLangLower][nameKey.toLowerCase()];
  };

  // Handle specific language cases
  let convertedName;
  if (languageToUse === inputLanguageToUse) {
    convertedName = name;
  } else if (languageToUse === "English") {
    convertedName = convertName(inputLanguageToUse, "English", name);
  } else if (inputLanguageToUse === "English") {
    convertedName = convertName("English", languageToUse, name);
  } else {
    const englishName = convertName(inputLanguageToUse, "English", name);
    convertedName = convertName("English", languageToUse, englishName);
  }

  return capitalizeFirstLetter(convertedName);
}

module.exports = getName;
