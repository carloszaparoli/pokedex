import { Button } from "./button";
import { InputField, InputRoot } from "./input";
import { PokeballIcon } from "./icons/pokeball-icon";
import { POKEMON_TYPE_LABELS, POKEMON_TYPES } from "@/constants/pokemon";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { twMerge } from "tailwind-merge";
import { PokemonType } from "@/types/pokemon";
import { FormEvent, useEffect, useState } from "react";

interface PokemonFiltersProps {
  searchQuery: string;
  selectedType: PokemonType | null;
  onSearch: (value: string) => void;
  onSelectType: (type: PokemonType | null) => void;
}

export function PokemonFilters({
  searchQuery,
  selectedType,
  onSearch,
  onSelectType,
}: PokemonFiltersProps) {
  const [search, setSearch] = useState(searchQuery);

  const iconTypeClasses: Record<PokemonType, string> = {
    bug: "text-type-bug-primary",
    dark: "text-type-dark-primary",
    dragon: "text-type-dragon-primary",
    electric: "text-type-electric-primary",
    fairy: "text-type-fairy-primary",
    fighting: "text-type-fighting-primary",
    fire: "text-type-fire-primary",
    flying: "text-type-flying-primary",
    ghost: "text-type-ghost-primary",
    grass: "text-type-grass-primary",
    ground: "text-type-ground-primary",
    ice: "text-type-ice-primary",
    normal: "text-type-normal-primary",
    poison: "text-type-poison-primary",
    psychic: "text-type-psychic-primary",
    rock: "text-type-rock-primary",
    steel: "text-type-steel-primary",
    water: "text-type-water-primary",
  };

  const hoverTypeClasses: Record<PokemonType, string> = {
    bug: "group-hover:border-type-bug-primary",
    dark: "group-hover:border-type-dark-primary",
    dragon: "group-hover:border-type-dragon-primary",
    electric: "group-hover:border-type-electric-primary",
    fairy: "group-hover:border-type-fairy-primary",
    fighting: "group-hover:border-type-fighting-primary",
    fire: "group-hover:border-type-fire-primary",
    flying: "group-hover:border-type-flying-primary",
    ghost: "group-hover:border-type-ghost-primary",
    grass: "group-hover:border-type-grass-primary",
    ground: "group-hover:border-type-ground-primary",
    ice: "group-hover:border-type-ice-primary",
    normal: "group-hover:border-type-normal-primary",
    poison: "group-hover:border-type-poison-primary",
    psychic: "group-hover:border-type-psychic-primary",
    rock: "group-hover:border-type-rock-primary",
    steel: "group-hover:border-type-steel-primary",
    water: "group-hover:border-type-water-primary",
  };

  const selectedTypeClasses: Record<PokemonType, string> = {
    bug: "bg-type-bug-primary text-white border-type-bug-primary",
    dark: "bg-type-dark-primary text-white border-type-dark-primary",
    dragon: "bg-type-dragon-primary text-white border-type-dragon-primary",
    electric:
      "bg-type-electric-primary text-white border-type-electric-primary",
    fairy: "bg-type-fairy-primary text-white border-type-fairy-primary",
    fighting:
      "bg-type-fighting-primary text-white border-type-fighting-primary",
    fire: "bg-type-fire-primary text-white border-type-fire-primary",
    flying: "bg-type-flying-primary text-white border-type-flying-primary",
    ghost: "bg-type-ghost-primary text-white border-type-ghost-primary",
    grass: "bg-type-grass-primary text-white border-type-grass-primary",
    ground: "bg-type-ground-primary text-white border-type-ground-primary",
    ice: "bg-type-ice-primary text-white border-type-ice-primary",
    normal: "bg-type-normal-primary text-white border-type-normal-primary",
    poison: "bg-type-poison-primary text-white border-type-poison-primary",
    psychic: "bg-type-psychic-primary text-white border-type-psychic-primary",
    rock: "bg-type-rock-primary text-white border-type-rock-primary",
    steel: "bg-type-steel-primary text-white border-type-steel-primary",
    water: "bg-type-water-primary text-white border-type-water-primary",
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(search);
  };

  useEffect(() => {
    if (!searchQuery) setSearch("");
  }, [searchQuery]);

  return (
    <div className="space-y-8 md:space-y-10">
      <form onSubmit={handleSubmit}>
        <InputRoot className="mx-auto w-full max-w-[360px]">
          <InputField
            placeholder="Pokémon name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="-mr-2 size-8 cursor-pointer p-1" type="submit">
            <PokeballIcon className="size-5 text-white" />
          </Button>
        </InputRoot>
      </form>

      <div className="flex scroll-m-10 gap-x-6 overflow-y-auto pb-2 md:mx-auto md:max-w-[800px] md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-4 md:pb-0">
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className="group cursor-pointer"
            onClick={() => onSelectType(type)}
          >
            <div
              className={twMerge(
                `mb-1 flex size-12 items-center justify-center rounded-full border transition-colors duration-300 ${iconTypeClasses[type]} ${hoverTypeClasses[type]}`,
                selectedType === type
                  ? selectedTypeClasses[type]
                  : "dark:bg-bluewood-900 dark:border-bluewood-800 border-gray-200 bg-white",
              )}
            >
              <PokemonTypeIcon
                type={type}
                className={`size-5 ${selectedType === type && `text-white`}`}
              />
            </div>
            <span
              className={twMerge(
                "dark:text-bluewood-500 text-xs text-gray-500",
                `${
                  selectedType === type &&
                  `dark:text-bluewood-300 font-medium text-gray-700`
                }`,
              )}
            >
              {POKEMON_TYPE_LABELS[type]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
