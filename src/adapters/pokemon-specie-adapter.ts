import { PokemonSpecieResponse } from "@/types/api-response";
import { PokemonSpecie } from "@/types/pokemon";
import { capitalize } from "@/utils/formatters";

export const pokemonSpecieAdapter = (
  pokemonSpecie: PokemonSpecieResponse
): PokemonSpecie => {
  const description =
    pokemonSpecie.flavor_text_entries.find(
      (flavorText) => flavorText.version.name === "firered"
    )?.flavor_text ?? "";
  const femaleRatio = (pokemonSpecie.gender_rate * 100) / 8;
  const maleRatio = 100 - (pokemonSpecie.gender_rate * 100) / 8;
  const eggGroups = pokemonSpecie.egg_groups.map((group) =>
    capitalize(group.name)
  );

  return {
    description,
    femaleRatio,
    maleRatio,
    captureRate: pokemonSpecie.capture_rate,
    baseHapiness: pokemonSpecie.base_happiness,
    eggGroups,
    evolutionChainUrl: pokemonSpecie.evolution_chain.url,
  };
};
