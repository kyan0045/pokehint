# PokeHint

NPM package to automatically solve hints & check the rarity of pokemon, made for pokemon discord bots like Pokétwo

[![](https://img.shields.io/npm/v/pokehint.svg)](https://www.npmjs.com/package/pokehint)
[![](https://img.shields.io/npm/dm/pokehint.svg)](https://www.npmjs.com/package/pokehint)
[![CI](https://github.com/kyan0045/pokehint/actions/workflows/ci.yml/badge.svg)](https://github.com/kyan0045/pokehint/actions/workflows/ci.yml)

## Installation

Use the package manager [npm](https://www.npmjs.com/package/pokehint) to install the module.

```bash
npm i pokehint
```

## Usage

```javascript
const { solveHint, checkRaritySync, getName, getImage } = require("pokehint");

async function main() {
  // Solving hints returns every matching name.
  console.log(solveHint("The pokémon is M_l__es.")); // ["Moltres"]

  // Checking rarity.
  console.log(checkRaritySync("Moltres")); // "Legendary"

  // Converting a name to a different language.
  console.log(
    await getName({
      name: "Solosis",
      language: "French",
      inputLanguage: "English",
    })
  ); // "Nucléos"

  // Getting regular, shiny, and Gigantamax Pokétwo sprites.
  console.log(getImage("Charizard")); // https://cdn.poketwo.net/images/6.png
  console.log(getImage("Charizard", true)); // https://cdn.poketwo.net/shiny/6.png
  console.log(getImage("Charizard", false, true)); // https://cdn.poketwo.net/images/10187.png
}

main().catch(console.error);
```

### Rarity Migration

`checkRarity()` is deprecated but remains available for compatibility with Promise-based code. Use the synchronous `checkRaritySync()` for new code:

```javascript
const { checkRarity, checkRaritySync } = require("pokehint");

checkRaritySync("Moltres"); // "Legendary"
await checkRarity("Moltres"); // "Legendary" (deprecated)
```

## Links

- [NPM](https://www.npmjs.com/package/pokehint)
- [Discord](https://discord.com/users/1101294362505269379)

## Contributing

Pull requests are always welcome, as long as you follow [our contributing guidelines](/CONTRIBUTING.md). For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the usage examples in this file as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
