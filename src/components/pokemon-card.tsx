import { Pokemon } from "@/types/pokemon";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import {
  capitalize,
  formatKebabCaseToTitle,
  formatPokemonId,
} from "@/utils/formatters";
import Image from "next/image";
import { PatternIcon } from "./icons/pattern-icon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const bgTypeColors: { [key: string]: string } = {
    bug: "bg-type-bug-secondary",
    dark: "bg-type-dark-secondary",
    dragon: "bg-type-dragon-secondary",
    electric: "bg-type-electric-secondary",
    fairy: "bg-type-fairy-secondary",
    fighting: "bg-type-fighting-secondary",
    fire: "bg-type-fire-secondary",
    flying: "bg-type-flying-secondary",
    ghost: "bg-type-ghost-secondary",
    grass: "bg-type-grass-secondary",
    ground: "bg-type-ground-secondary",
    ice: "bg-type-ice-secondary",
    normal: "bg-type-normal-secondary",
    poison: "bg-type-poison-secondary",
    psychic: "bg-type-psychic-secondary",
    rock: "bg-type-rock-secondary",
    steel: "bg-type-steel-secondary",
    water: "bg-type-water-secondary",
  };

  const badgeTypeColors: { [key: string]: string } = {
    bug: "bg-type-bug-primary",
    dark: "bg-type-dark-primary",
    dragon: "bg-type-dragon-primary",
    electric: "bg-type-electric-primary",
    fairy: "bg-type-fairy-primary",
    fighting: "bg-type-fighting-primary",
    fire: "bg-type-fire-primary",
    flying: "bg-type-flying-primary",
    ghost: "bg-type-ghost-primary",
    grass: "bg-type-grass-primary",
    ground: "bg-type-ground-primary",
    ice: "bg-type-ice-primary",
    normal: "bg-type-normal-primary",
    poison: "bg-type-poison-primary",
    psychic: "bg-type-psychic-primary",
    rock: "bg-type-rock-primary",
    steel: "bg-type-steel-primary",
    water: "bg-type-water-primary",
  };

  const formattedPokemonId = formatPokemonId(pokemon.id);
  const formattedPokemonName = formatKebabCaseToTitle(pokemon.name);

  return (
    <a
      href={`/pokemon/${pokemon.name}`}
      className={`${
        bgTypeColors[pokemon.types[0]]
      } group relative p-5 rounded-lg hover:-translate-y-1 focus:-translate-y-1 transition-transform duration-300 outline-none bg-[url('/pokeball-gradient.svg')] bg-no-repeat bg-right-top bg-[length:144px]`}
    >
      <PatternIcon className="absolute w-[74px] left-20 top-1.5" />
      <div className="space-y-2">
        <span className="block text-sm font-semibold text-muted leading-none">
          {formattedPokemonId}
        </span>
        <span className="text-white block text-2xl font-semibold leading-none whitespace-nowrap overflow-hidden text-ellipsis">
          {formattedPokemonName}
        </span>
        <div className="flex gap-1">
          {pokemon.types.map((type) => {
            const formattedTypeName = capitalize(type);

            return (
              <div
                key={`${pokemon.name}-${type}`}
                className={`${badgeTypeColors[type]} flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-sm text-white`}
              >
                <PokemonTypeIcon
                  className="size-3 transition-colors duration-1000"
                  type={type}
                />
                {formattedTypeName}
              </div>
            );
          })}
        </div>
      </div>
      <Image
        src={pokemon.image}
        width={130}
        height={130}
        alt={pokemon.name}
        className="absolute right-5 -top-5 group-hover:animate-bounceSmooth group-focus:animate-bounceSmooth"
      />
    </a>
  );
}
