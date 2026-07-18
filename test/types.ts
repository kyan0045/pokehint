import { checkRarity, checkRaritySync, getImage, getName, solveHint, type Rarity } from "../index";

const matches: string[] = solveHint("The pokémon is M_l__es.");
const syncRarity: Rarity = checkRaritySync("Moltres");
const asyncRarity: Promise<Rarity> = checkRarity("Moltres");
const image: string = getImage("Charizard", true, false);
const translatedName: Promise<string> = getName({
  name: "Solosis",
  language: "French",
  inputLanguage: "English",
});

void matches;
void syncRarity;
void asyncRarity;
void image;
void translatedName;
