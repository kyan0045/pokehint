# PokeHint
[![](https://img.shields.io/npm/v/pokehint.svg)](https://www.npmjs.com/package/pokehint)

## Installation

Use the package manager [npm](https://www.npmjs.com/package/pokehint) to install the module.

```bash
npm i pokehint
```

## Usage

```javascript
const { solveHint, checkRarity } = require('pokehint');

// Solving hints
var hint = message.content;
console.log(solveHint(hint)) // Logs the Pokémon that has been found.

// Checking the rarity
var pokemonName = 'Moltres';
console.log(checkRarity(pokemonName)) // Logs Moltres' rarity: 'Legendary'.
```

## Links
- [NPM](https://www.npmjs.com/package/pokehint)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
