import { FemaleGenderIcon } from "@/components/icons/female-gender-icon";
import { MaleGenderIcon } from "@/components/icons/male-gender-icon";
import { PatternIcon } from "@/components/icons/pattern-icon";
import { PokemonTypeIcon } from "@/components/pokemon-type-icon";
import { POKEMON_TYPE_LABELS } from "@/constants/pokemon";
import {
  getEvolutionChainByUrl,
  getPokemonDetailsByName,
  getPokemonSpecieByUrl,
} from "@/services/pokemon";
import { formatKebabCaseToTitle, formatPokemonId } from "@/utils/formatters";
import Image from "next/image";
import { StatsTable } from "./components/stats-table";
import { Evolutions } from "./components/evolutions";
import { Metadata } from "next";
import { PokemonCryButton } from "./components/pokemon-cry-button";
import { BackButton } from "./components/back-button";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const name = (await params).name;
  const title = `${formatKebabCaseToTitle(name)} | Pokédex`;
  const { image } = await getPokemonDetailsByName(name);

  const icon = image ?? "/favicon.png";

  return {
    title,
    icons: icon,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemonName = (await params).name;

  const pokemonDetails = await getPokemonDetailsByName(pokemonName);
  const pokemonSpecie = await getPokemonSpecieByUrl(pokemonDetails.specieUrl);
  const evolutionChain = await getEvolutionChainByUrl(
    pokemonSpecie.evolutionChainUrl,
  );

  const formattedPokemonId = formatPokemonId(pokemonDetails.id);
  const formattedPokemonName = formatKebabCaseToTitle(pokemonDetails.name);

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
        className={`mx-auto w-full overflow-hidden md:mt-12 md:max-w-[700px] md:rounded-2xl ${bgTypeColors[firstType]}`}
      >
        <div
          className={`relative bg-[url(/pokeball-gradient.svg)] bg-[length:256px] bg-[position:right_-24px_top_-24px] bg-no-repeat p-5 pb-8 md:p-8`}
        >
          <BackButton />
          <div className="relative z-10 flex items-center justify-between md:justify-around">
            <div className="space-y-1 md:space-y-2">
              <span className="text-muted block text-lg leading-none font-semibold md:text-xl">
                {formattedPokemonId}
              </span>
              <h1 className="block text-3xl font-bold text-white md:text-4xl">
                {formattedPokemonName}
              </h1>
              <div className="flex gap-1">
                {pokemonDetails.types.map((type) => (
                  <div
                    key={`${pokemonDetails.name}-${type}`}
                    className={`${badgeTypeColors[type]} flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-white md:text-sm`}
                  >
                    <PokemonTypeIcon
                      className="size-3 transition-colors duration-1000 md:size-3.5"
                      type={type}
                    />
                    {POKEMON_TYPE_LABELS[type]}
                  </div>
                ))}
              </div>
            </div>

            {pokemonDetails.image && (
              <Image
                src={pokemonDetails.image}
                width={220}
                height={220}
                className="size-[150px] md:size-[220px]"
                alt={pokemonDetails.name}
              />
            )}
          </div>
          <PatternIcon className="absolute bottom-0 left-8 w-[120px] md:w-[140px]" />
        </div>

        <div className="dark:bg-bluewood-900 dark:border-bluewood-800 relative space-y-10 rounded-t-4xl border-gray-200 bg-white p-5 py-8 transition-colors duration-300 md:border md:p-8">
          <p className="dark:text-bluewood-400 text-base text-gray-500">
            {pokemonSpecie.description}
          </p>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Pokédex Data
            </h4>
            <div className="space-y-5">
              <div className="flex items-center">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Height
                </span>
                <span className="dark:text-bluewood-400 block text-lg text-gray-500">
                  {pokemonDetails.height}m
                </span>
              </div>
              <div className="flex items-center">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Weight
                </span>
                <span className="dark:text-bluewood-400 block text-lg text-gray-500">
                  {pokemonDetails.weight}kg
                </span>
              </div>
              <div className="flex">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Abilities
                </span>
                <div className="space-y-2">
                  {pokemonDetails.abilities.map(({ name, isHidden }) => (
                    <span
                      key={name}
                      className={`dark:text-bluewood-400 block text-gray-500 ${
                        isHidden ? "text-sm" : "text-lg"
                      }`}
                    >
                      {name}
                      {isHidden && (
                        <span className="ml-1 italic">(hidden ability)</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Cry Sound
                </span>
                <PokemonCryButton cryUrl={pokemonDetails.cryUrl} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`text-xl font-bold ${textTypeColors[firstType]}`}>
              Training
            </h4>
            <div className="space-y-5">
              <div className="flex items-center">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Catch Rate
                </span>
                <span className="dark:text-bluewood-400 block text-lg text-gray-500">
                  {pokemonSpecie.captureRate}
                </span>
              </div>
              <div className="flex items-center">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Base Friendship
                </span>
                <span className="dark:text-bluewood-400 block text-lg text-gray-500">
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
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Gender Radio
                </span>
                {pokemonSpecie.femaleRatio >= 0 ? (
                  <div className="flex gap-5">
                    <div className="text-type-flying-primary flex items-center gap-0.5 text-lg font-medium">
                      <MaleGenderIcon className="size-4" />
                      <span className="block text-lg">
                        {pokemonSpecie.maleRatio}%
                      </span>
                    </div>

                    <div className="text-type-fairy-primary flex items-center gap-0.5 text-lg font-medium">
                      <FemaleGenderIcon className="size-4" />
                      <span className="block text-lg">
                        {pokemonSpecie.femaleRatio}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="dark:text-bluewood-400 block text-lg text-gray-500">
                    Gender unknown
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="dark:text-bluewood-100 block w-[148px] font-medium text-gray-900">
                  Egg Groups
                </span>
                <span className="dark:text-bluewood-400 block text-lg text-gray-500">
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
