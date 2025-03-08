export type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export interface Pokemon {
  id: number;
  name: string;
  image?: string;
  types: PokemonType[];
}

interface Ability {
  name: string;
  isHidden: boolean;
}

export interface Stats {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  percentage: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: Ability[];
  stats: Stats[];
  cryUrl: string;
  specieUrl: string;
}

export interface PokemonSpecie {
  description: string;
  maleRatio: number;
  femaleRatio: number;
  captureRate: number;
  baseHapiness: number;
  eggGroups: string[];
  evolutionChainUrl: string;
}

export interface PokemonUrl {
  name: string;
  url: string;
}

export interface EvolutionChain {
  from: {
    id: number;
    name: string;
    image: string;
  };
  to: {
    id: number;
    name: string;
    image: string;
  };
  minLevel?: number;
  item?: ItemInfo;
}

export interface ItemInfo {
  name: string;
  image: string;
}
