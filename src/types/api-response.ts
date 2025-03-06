import { PokemonType, PokemonUrl } from "./pokemon";

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
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: PokemonType } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  species: { name: string; url: string };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
    legacy: string;
  };
}

export interface PokemonSpecieResponse {
  flavor_text_entries: {
    flavor_text: string;
    version: { name: string };
  }[];
  egg_groups: {
    name: string;
  }[];
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainResponse {
  id: number;
  chain: EvolutionNode;
}

export interface EvolutionNode {
  species: {
    name: string;
  };
  evolves_to: EvolutionNode[];
  evolution_details: EvolutionDetail[];
}

interface EvolutionDetail {
  min_level?: number;
  item?: {
    name: string;
  };
}

export interface ItemInfoResponse {
  name: string;
  sprites: { default: string };
}
