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
      <p className="dark:text-bluewood-400 text-gray-500 transition-colors duration-300">
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
              <div className="bg-[url(/pokeball-gradient-light.svg)] bg-[length:112px] bg-no-repeat p-3 md:bg-[length:156px] dark:bg-[url(/pokeball-gradient-dark.svg)]">
                {from.image && (
                  <Image
                    src={from.image}
                    alt={formattedFromPokemonName}
                    width={132}
                    height={132}
                    className="size-[88px] transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1 md:size-[132px]"
                  />
                )}
              </div>
              <span className="dark:text-bluewood-500 text-xs font-medium text-gray-400 md:text-sm">
                {formattedFromPokemonId}
              </span>
              <h4 className="dark:text-bluewood-100 text-base leading-none font-bold text-gray-900 md:text-lg">
                {formattedFromPokemonName}
              </h4>
            </Link>

            <div className="dark:text-bluewood-100 flex flex-col items-center gap-2 text-gray-900">
              <ArrowRight className="dark:text-bluewood-700 size-8 text-gray-200" />
              {minLevel && (
                <span className="block text-xs font-bold md:text-sm">
                  Level {minLevel}
                </span>
              )}
              {item && (
                <div className="flex items-center">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={30}
                      height={30}
                      className="size-7 md:size-[30px]"
                    />
                  )}
                  <span className="block text-xs font-bold md:text-sm">
                    {formattedItemName}
                  </span>
                </div>
              )}
            </div>

            <Link href={`/pokemon/${to.name}`} className="group text-center">
              <div className="bg-[url(/pokeball-gradient-light.svg)] bg-[length:112px] bg-no-repeat p-3 md:bg-[length:156px] dark:bg-[url(/pokeball-gradient-dark.svg)]">
                {to.image && (
                  <Image
                    src={to.image}
                    alt={formattedToPokemonName}
                    width={132}
                    height={132}
                    className="size-[88px] transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1 md:size-[132px]"
                  />
                )}
              </div>
              <span className="dark:text-bluewood-500 text-xs font-medium text-gray-400 md:text-sm">
                {formattedToPokemonId}
              </span>
              <h4 className="dark:text-bluewood-100 text-base leading-none font-bold text-gray-900 md:text-lg">
                {formattedToPokemonName}
              </h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
