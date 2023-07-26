async function solveHint(message) {
    const pokemon = require('../data/pokemon.json')

    const str = message.content;
    const words = str.split(" ");
    const lastWord = words[words.length - 1];

    const pattern1 = lastWord.replace(/\!/,"")
    const pattern2 = pattern1.replace(/\./,"")
    const pattern3 = pattern2.replace(/\\/g,"")

    const hint = pattern3.replace(/_/g,".")
    let matches = pokemon.reduce((p, c) => {
        let val = c.match(hint); 
        if (!val) return p; 
        if (!pokemon.includes(val[0])) return p; 
        val.forEach(v => {
            if (val[0].length == hint.length) p.push(v); 
        });
        return p; 
    }, [] );
    return matches;
}

module.exports = solveHint;
