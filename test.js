const getName = require("./functions/getName.js");
const solveHint = require("./functions/solveHint.js");
const getImage = require("./functions/getImage.js");
const checkRarity = require("./functions/checkRarity.js");

async function test() {
  console.log(
    await getName({
      name: "iron bundle",
      language: "French",
      inputLanguage: "English",
    })
  );
  console.log(
    await getImage("rayquaza", true)
  )
}

test();
