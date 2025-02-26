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
  image: string;
  types: PokemonType[];
}

export interface PokemonUrl {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonUrl[];
  count: number;
}

export interface PokemonListByTypeResponse {
  pokemon: {
    pokemon: PokemonUrl;
  }[];
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: string } }[];
}
