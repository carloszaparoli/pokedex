import { itemInfoAdapter } from "@/adapters/item-info-adapter";
import { pokemonDetailsAdapter } from "@/adapters/pokemon-details-adapter";
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
import { notFound } from "next/navigation";

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
    `/type/${type}`,
  );
  return data.pokemon.map((p) => p.pokemon);
}

export async function getPokemonDetailsByUrl(url: string) {
  const { data } = await axios.get<PokemonDetailsResponse>(url);

  return data;
}

export async function getPokemonDetailsByName(name: string) {
  try {
    const { data } = await pokeAPI.get<PokemonDetailsResponse>(
      `/pokemon/${name}`,
    );

    return pokemonDetailsAdapter(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw Error("Error searching for pokemon");
  }
}

export async function getPokemonSpecieByUrl(url: string) {
  const { data } = await axios.get<PokemonSpecieResponse>(url);

  return pokemonSpecieAdapter(data);
}

export async function getEvolutionChainByUrl(url: string) {
  const { data } = await axios.get<EvolutionChainResponse>(url);

  return data;
}

export async function getItemInfo(itemName: string) {
  const { data } = await pokeAPI.get<ItemInfoResponse>(`/item/${itemName}`);

  return itemInfoAdapter(data);
}
