const fs = require("fs").promises;
const path = require("path");
const pokemon = require("../data/main/pokemon.json");

// Cache the name mappings to improve performance
let cachedNameMappings = null;
const languages = ["english", "japanese", "german", "french"];
const canonicalEnglishNames = new Map(
  pokemon.map((pokemonName) => [pokemonName.toLowerCase(), pokemonName])
);

/**
 * Loads and caches name mappings for different languages.
 * @returns {Promise<Object>} A promise that resolves to the name mappings object.
 * @throws {Error} If there's an error loading the name mappings.
 */
async function loadNameMappings() {
  if (cachedNameMappings) {
    return cachedNameMappings;
  }

  cachedNameMappings = (async () => {
    const nameMappings = {};

    await Promise.all(
      languages.map(async (language) => {
        const [data1, data2] = await Promise.all([
          fs.readFile(
            path.join(__dirname, "../data/languages/english-to-language/", `${language}.json`),
            "utf8"
          ),
          fs.readFile(
            path.join(__dirname, "../data/languages/language-to-english/", `${language}.json`),
            "utf8"
          ),
        ]);

        nameMappings[language] = {
          ...JSON.parse(data1),
          ...JSON.parse(data2),
        };
      })
    );

    return nameMappings;
  })();

  try {
    return await cachedNameMappings;
  } catch (error) {
    cachedNameMappings = null;
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
 * @returns {string} The detected language, or "english" if not found.
 */
function detectLanguage(name, nameMappings) {
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
async function getName({ name, language, inputLanguage } = {}) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("[PokeHint] Could not find a Pokémon name to convert.");
  }

  const pokemonName = name.trim();

  const normalizeLanguage = (value, parameterName) => {
    if (typeof value !== "string") {
      throw new Error(`[PokeHint] ${parameterName} must be a supported language.`);
    }

    const normalizedLanguage = value.toLowerCase();
    if (!languages.includes(normalizedLanguage)) {
      throw new Error(
        `[PokeHint] Unsupported ${parameterName}: ${value}. Supported languages are English, Japanese, German, and French.`
      );
    }

    return normalizedLanguage;
  };

  // Load name mappings
  const nameMappings = await loadNameMappings();

  // Determine languages to use
  const normalizedTargetLanguage = typeof language === "string" ? language.toLowerCase() : language;
  const languageToUse =
    normalizedTargetLanguage === "random" || language === undefined
      ? languages[Math.floor(Math.random() * languages.length)]
      : normalizeLanguage(language, "language");
  const inputLanguageToUse =
    inputLanguage === undefined
      ? detectLanguage(pokemonName, nameMappings)
      : normalizeLanguage(inputLanguage, "inputLanguage");

  // Helper function for name conversion
  const convertName = (fromLang, toLang, pokemonName) => {
    const lowercaseName = pokemonName.toLowerCase();
    if (toLang === fromLang) {
      return pokemonName;
    }

    const nameKey = nameMappings[fromLang][lowercaseName];
    if (!nameKey) {
      return pokemonName;
    }

    return nameMappings[toLang][nameKey.toLowerCase()] || pokemonName;
  };

  // Handle specific language cases
  let convertedName;
  if (languageToUse === inputLanguageToUse) {
    convertedName = pokemonName;
  } else if (languageToUse === "english") {
    convertedName = convertName(inputLanguageToUse, "english", pokemonName);
  } else if (inputLanguageToUse === "english") {
    convertedName = convertName("english", languageToUse, pokemonName);
  } else {
    const englishName = convertName(inputLanguageToUse, "english", pokemonName);
    convertedName = convertName("english", languageToUse, englishName);
  }

  if (languageToUse === "english") {
    return (
      canonicalEnglishNames.get(convertedName.toLowerCase()) || capitalizeFirstLetter(convertedName)
    );
  }

  return capitalizeFirstLetter(convertedName);
}

module.exports = getName;
