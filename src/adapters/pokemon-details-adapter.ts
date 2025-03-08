import { STAT_NAME_LABEL } from "@/constants/pokemon";
import { PokemonDetailsResponse } from "@/types/api-response";
import { PokemonDetails } from "@/types/pokemon";
import { capitalize } from "@/utils/formatters";
import { calculateStatRange } from "@/utils/stats";

export const pokemonDetailsAdapter = (
  pokemon: PokemonDetailsResponse
): PokemonDetails => {
  const height = pokemon.height / 10; //Convert to 'm'
  const weight = pokemon.weight / 10; //Convert to 'kg'
  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;
  const types = pokemon.types.map((t) => t.type.name);
  const abilities = pokemon.abilities.map((a) => ({
    name: capitalize(a.ability.name),
    isHidden: a.is_hidden,
  }));
  const stats = pokemon.stats.map((s) => {
    const name = STAT_NAME_LABEL[s.stat.name] || s.stat.name;
    const isHP = s.stat.name === "hp";
    const { min, max } = calculateStatRange(s.base_stat, isHP);
    const percentage = parseFloat(((s.base_stat * 100) / 255).toFixed(2));

    return {
      name,
      value: s.base_stat,
      minValue: min,
      maxValue: max,
      percentage,
    };
  });

  return {
    id: pokemon.id,
    name: pokemon.name,
    height,
    weight,
    image,
    types,
    stats,
    abilities,
    cryUrl: pokemon.cries.latest || pokemon.cries.legacy,
    specieUrl: pokemon.species.url,
  };
};
