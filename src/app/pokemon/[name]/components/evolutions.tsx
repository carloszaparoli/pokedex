import { EvolutionChain } from "@/types/pokemon";
import {
  capitalize,
  formatKebabCaseToTitle,
  formatPokemonId,
} from "@/utils/formatters";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EvolutionChainProps {
  evolutions: EvolutionChain[];
}

export function Evolutions({ evolutions }: EvolutionChainProps) {
  if (evolutions.length <= 0) {
    return (
      <p className="text-gray-500 dark:text-bluewood-400 transition-colors duration-300">
        This Pokemon does not evolve.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {evolutions.map(({ from, to, item, minLevel }) => {
        const formattedFromPokemonId = formatPokemonId(from.id);
        const formattedFromPokemonName = capitalize(from.name);

        const formattedToPokemonId = formatPokemonId(to.id);
        const formattedToPokemonName = capitalize(to.name);
        const formattedItemName = item && formatKebabCaseToTitle(item.name);

        return (
          <div
            key={`${from.name}-to-${to.name}`}
            className="flex items-center justify-between"
          >
            <Link href={`/pokemon/${from.name}`} className="group text-center">
              <div className="p-3 bg-[url(/pokeball-gradient-light.svg)] dark:bg-[url(/pokeball-gradient-dark.svg)] bg-no-repeat bg-[length:156px]">
                <Image
                  src={from.image}
                  alt={formattedFromPokemonName}
                  width={132}
                  height={132}
                  className="group-hover:-translate-y-1 group-focus:-translate-y-1 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-400 dark:text-bluewood-500">
                {formattedFromPokemonId}
              </span>
              <h4 className="text-lg font-bold leading-none text-gray-900 dark:text-bluewood-100">
                {formattedFromPokemonName}
              </h4>
            </Link>

            <div className="flex flex-col items-center gap-2 text-gray-900 dark:text-bluewood-100">
              <ArrowRight className="size-8 text-gray-200 dark:text-bluewood-700" />
              {minLevel && (
                <span className="block text-sm font-bold">
                  Level {minLevel}
                </span>
              )}
              {item && (
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={30}
                    height={30}
                  />
                  <span className="block text-sm font-bold">
                    {formattedItemName}
                  </span>
                </div>
              )}
            </div>

            <Link href={`/pokemon/${to.name}`} className="group text-center">
              <div className="p-3 bg-[url(/pokeball-gradient-light.svg)] dark:bg-[url(/pokeball-gradient-dark.svg)] bg-no-repeat bg-[length:156px]">
                <Image
                  src={to.image}
                  alt={formattedToPokemonName}
                  width={132}
                  height={132}
                  className="group-hover:-translate-y-1 group-focus:-translate-y-1 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-400 dark:text-bluewood-500">
                {formattedToPokemonId}
              </span>
              <h4 className="text-lg font-bold leading-none text-gray-900 dark:text-bluewood-100">
                {formattedToPokemonName}
              </h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
