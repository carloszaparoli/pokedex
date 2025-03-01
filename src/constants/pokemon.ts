import { PokemonType } from "@/types/pokemon";

export const POKEMON_TYPES: PokemonType[] = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const POKEMON_TYPE_LABELS: Record<PokemonType, string> = {
  bug: "Bug",
  dark: "Dark",
  dragon: "Dragon",
  electric: "Electric",
  fairy: "Fairy",
  fighting: "Fighting",
  fire: "Fire",
  flying: "Flying",
  ghost: "Ghost",
  grass: "Grass",
  ground: "Ground",
  ice: "Ice",
  normal: "Normal",
  poison: "Poison",
  psychic: "Psychic",
  rock: "Rock",
  steel: "Steel",
  water: "Water",
};

export const STAT_NAME_LABEL: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};
