
async function solveHint(message) {
    const pokemon = require('../data/pokemon.json');
  
    if (message.content) str = message.content;
    if (message && !message.content) str = message;
    if (!message) throw new Error('[PokeHint] The message object provided is undefined.')
    const words = str.split(" ");
    let lastWord = words[words.length - 1];
    if (words[3].includes('_') && words[4]) {
        lastWord = words[3] + ' ' + words[4]
    }
  
    const pattern1 = lastWord.replace(/\!/,"");
    const pattern2 = pattern1.replace(/\./,"");
    const pattern3 = pattern2.replace(/\\/g,"");
  
    const hint = pattern3.replace(/_/g,".");
  
    function matchesHint(name, hint) {
      if (name.length !== hint.length) return false;
      for (let i = 0; i < name.length; i++) {
        if (hint[i] !== '.' && name[i].toLowerCase() !== hint[i].toLowerCase()) {
          return false;
        }
      }
      return true;
    }
  
    let matches = pokemon.filter(p => matchesHint(p, hint));
  
    return matches[0];
  }
  
  module.exports = solveHint;
  
  
  
