import { mapEvolutionChain } from "@/adapters/evolution-chain-adapter";
import { itemInfoAdapter } from "@/adapters/item-info-adapter";
import {
  pokemonAdapter,
  pokemonDetailsAdapter,
} from "@/adapters/pokemon-adapter";
import { pokemonSpecieAdapter } from "@/adapters/pokemon-specie-adapter";
import {
  EvolutionChainResponse,
  ItemInfoResponse,
  PokemonDetailsResponse,
  PokemonListByTypeResponse,
  PokemonListResponse,
  PokemonSpecieResponse,
} from "@/types/api-response";
import { PokemonType } from "@/types/pokemon";
import axios from "axios";

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function getAllPokemonUrls() {
  const { data } = await pokeAPI.get<PokemonListResponse>("/pokemon", {
    params: { offset: 0, limit: 10000 },
  });
  return data;
}

export async function getPokemonUrlsByType(type: PokemonType) {
  const { data } = await pokeAPI.get<PokemonListByTypeResponse>(
    `/type/${type}`
  );
  return data.pokemon.map((p) => p.pokemon);
}

export async function getPokemonDetails(url: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data: details } = await pokeAPI.get<PokemonDetailsResponse>(url);

  return pokemonAdapter(details);
}

export async function getPokemonDetailsByName(name: string) {
  const { data } = await pokeAPI.get<PokemonDetailsResponse>(
    `/pokemon/${name}`
  );

  return pokemonDetailsAdapter(data);
}

export async function getPokemonSpecieByName(name: string) {
  const { data } = await pokeAPI.get<PokemonSpecieResponse>(
    `/pokemon-species/${name}`
  );

  return pokemonSpecieAdapter(data);
}

export async function getEvolutionChainByName(url: string) {
  const { data } = await axios.get<EvolutionChainResponse>(url);

  return mapEvolutionChain(data);
}

export async function getItemInfo(itemName: string) {
  const { data } = await pokeAPI.get<ItemInfoResponse>(`/item/${itemName}`);

  return itemInfoAdapter(data);
}
