async function checkRarity(pokemonName) {
    const pokemon = require('../data/pokemon.json');
    const legendaries = require('../data/legendary.json');
    const mythicals = require('../data/mythical.json');
    const ultra_beasts = require('../data/ultra-beast.json');

    if (!pokemon.includes(pokemonName)) { throw new Error('Unable to identify that pokemon.')}
    if (legendaries.includes(pokemonName)) return 'legendary'
    if (mythicals.includes(pokemonName)) return 'mythical'
    if (ultra_beasts.includes(pokemonName)) return 'ultra_beast'
    
    if (pokemon.includes(pokemonName)) return 'regular'
}

module.exports = checkRarity;
