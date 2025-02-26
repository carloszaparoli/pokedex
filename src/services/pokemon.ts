import { pokemonAdapter } from "@/adapters/pokemon-adapter";
import {
  PokemonDetailsResponse,
  PokemonListByTypeResponse,
  PokemonListResponse,
  PokemonType,
} from "@/types/pokemon";
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
