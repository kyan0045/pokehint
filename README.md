# PokeHint

NPM package to automatically solve hints & check the rarity of pokemon, made for pokemon discord bots like Pokétwo

[![](https://img.shields.io/npm/v/pokehint.svg)](https://www.npmjs.com/package/pokehint)
[![](https://img.shields.io/npm/dm/pokehint.svg)](https://www.npmjs.com/package/pokehint)

## Installation

Use the package manager [npm](https://www.npmjs.com/package/pokehint) to install the module.

```bash
npm i pokehint
```

## Usage

```javascript
const { solveHint, checkRarity, getName, getImage } = require("pokehint");

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
```

## Links

- [NPM](https://www.npmjs.com/package/pokehint)
- [Discord](https://discord.com/users/1101294362505269379)

## Contributing

Pull requests are always welcome, as long as you follow [our contributing guidelines](/CONTRIBUTING.md). For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the usage examples in this file as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
