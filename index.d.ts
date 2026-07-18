export type Language =
  "english" | "English" | "japanese" | "Japanese" | "german" | "German" | "french" | "French";

export interface HintMessage {
  content: string;
}

export interface GetNameOptions {
  name: string;
  language?: Language | "random";
  inputLanguage?: Language;
}

export type Rarity =
  "Legendary" | "Mythical" | "Ultra Beast" | "Regional" | "Event" | "Gigantamax" | "Regular";

export function solveHint(message: string | HintMessage): string[];
/**
 * @deprecated Use checkRaritySync instead. This function is retained for Promise compatibility.
 */
export function checkRarity(pokemonName: string): Promise<Rarity>;
export function checkRaritySync(pokemonName: string): Rarity;
export function getName(options: GetNameOptions): Promise<string>;
export function getImage(pokemon: string, shiny?: boolean, gigantamax?: boolean): string;
