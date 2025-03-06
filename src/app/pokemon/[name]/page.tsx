// export async function generateStaticParams() {
//   const data = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
//   ).then((res) => res.json());

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";
import { FemaleGenderIcon } from "@/components/icons/female-gender-icon";
import { MaleGenderIcon } from "@/components/icons/male-gender-icon";
import { PatternIcon } from "@/components/icons/pattern-icon";
import { PokemonTypeIcon } from "@/components/pokemon-type-icon";
import { POKEMON_TYPE_LABELS } from "@/constants/pokemon";
import {
  getEvolutionChainByName,
  getPokemonDetailsByName,
  getPokemonSpecieByName,
} from "@/services/pokemon";
import { capitalize, formatPokemonId } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";
import { StatsTable } from "./components/stats-table";
import { Evolutions } from "./components/evolutions";
import { Metadata } from "next";
import { PokemonCryButton } from "./components/pokemon-cry-button";

//   return data.results.map((pokemon: { name: string }) => {
//     return {
//       slug: pokemon.name,
//     };
//   });
// }

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const title = `${capitalize((await params).name)} | Pokédex`;

  return {
    title,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemonName = (await params).name;

  const pokemonDetails = await getPokemonDetailsByName(pokemonName);
  const pokemonSpecie = await getPokemonSpecieByName(pokemonName);
  const evolutionChain = await getEvolutionChainByName(
    pokemonSpecie.evolutionChainUrl
  );

  const formattedPokemonId = formatPokemonId(pokemonDetails.id);
  const formattedPokemonName = capitalize(pokemonDetails.name);

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

  const textTypeColors: { [key: string]: string } = {
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

  const firstType = pokemonDetails.types[0];

  return (
    <div>
      <div
        className={`w-full max-w-[700px] mx-auto overflow-hidden rounded-2xl mt-12 ${bgTypeColors[firstType]}`}
      >
        <div
          className={`relative flex items-center justify-around p-8 bg-[url(/pokeball-gradient.svg)] bg-no-repeat bg-[position:right_-24px_top_-24px] bg-[length:256px] 
          `}
        >
          <Link
            href="/"
            className="absolute left-8 top-8 transition-opacity hover:opacity-50"
          >
            <ArrowLeftIcon className="text-white size-7" />
          </Link>
          <div className="space-y-2">
            <span className="block text-muted text-xl font-semibold leading-none ">
              {formattedPokemonId}
            </span>
            <div className="flex items-center gap-2">
              <h1 className="block text-4xl text-white font-bold leading-none">
                {formattedPokemonName}
              </h1>
              <PokemonCryButton cryUrl={pokemonDetails.cryUrl} />
            </div>
            <div className="flex gap-1">
              {pokemonDetails.types.map((type) => (
                <div
                  key={`${pokemonDetails.name}-${type}`}
                  className={`${badgeTypeColors[type]} text-white flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-sm`}
                >
                  <PokemonTypeIcon
                    className="size-3.5 transition-colors duration-1000"
                    type={type}
                  />
                  {POKEMON_TYPE_LABELS[type]}
                </div>
              ))}
            </div>
          </div>
          <PatternIcon className="absolute left-8 bottom-0 w-[140px]" />
          <Image
            src={pokemonDetails.image}
            width={220}
            height={220}
            alt={pokemonDetails.name}
          />
        </div>

        <div className="relative p-8 bg-white dark:bg-bluewood-900 border border-gray-200 dark:border-bluewood-800 rounded-t-4xl space-y-10 transition-colors duration-300">
          <p className="text-gray-500 dark:text-bluewood-400">
            {pokemonSpecie.description}
          </p>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Pokédex Data
            </h4>
            <div className="space-y-5">
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Height
                </span>
                <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                  {pokemonDetails.height}m
                </span>
              </div>
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Weight
                </span>
                <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                  {pokemonDetails.weight}kg
                </span>
              </div>
              <div className="flex">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Abilities
                </span>
                <div className="space-y-2">
                  {pokemonDetails.abilities.map(({ name, isHidden }) => (
                    <span
                      key={name}
                      className={`block text-gray-500 dark:text-bluewood-400 ${
                        isHidden ? "text-sm" : "text-lg"
                      }`}
                    >
                      {name}
                      {isHidden && (
                        <span className="italic ml-1">(hidden ability)</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Training
            </h4>
            <div className="space-y-5">
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Catch Rate
                </span>
                <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                  {pokemonSpecie.captureRate}
                </span>
              </div>
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Base Friendship
                </span>
                <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                  {pokemonSpecie.baseHapiness}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Breeding
            </h4>
            <div className="space-y-5">
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Gender Radio
                </span>
                {pokemonSpecie.femaleRatio >= 0 ? (
                  <div className="flex gap-5">
                    <div className="flex items-center gap-0.5 text-lg font-medium text-type-flying-primary">
                      <MaleGenderIcon className="size-4" />
                      <span className="block text-lg">
                        {pokemonSpecie.maleRatio}%
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-lg font-medium text-type-fairy-primary">
                      <FemaleGenderIcon className="size-4" />
                      <span className="block text-lg">
                        {pokemonSpecie.femaleRatio}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                    Gender unknown
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="block font-medium w-[148px] text-gray-900 dark:text-bluewood-100">
                  Egg Groups
                </span>
                <span className="block text-lg text-gray-500 dark:text-bluewood-400">
                  {pokemonSpecie.eggGroups.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Base Stats
            </h4>
            <StatsTable type={firstType} stats={pokemonDetails.stats} />
          </div>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Evolutions
            </h4>
            <Evolutions evolutions={evolutionChain} />
          </div>
        </div>
      </div>
    </div>
  );
}
