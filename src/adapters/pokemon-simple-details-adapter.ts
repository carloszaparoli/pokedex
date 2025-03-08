import { PokemonDetailsResponse } from "@/types/api-response";
import { Pokemon } from "@/types/pokemon";

export const pokemonSimpleDetailsAdapter = (
  pokemon: PokemonDetailsResponse
): Pokemon => ({
  id: pokemon.id,
  name: pokemon.name,
  image:
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default,
  types: pokemon.types.map((t) => t.type.name),
});
