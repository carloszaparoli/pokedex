import { PokemonType, Stats } from "@/types/pokemon";

interface StatsTableProps {
  type: PokemonType;
  stats: Stats[];
}

export function StatsTable({ type, stats }: StatsTableProps) {
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);

  const bgTypePrimaryColors: { [key: string]: string } = {
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

  return (
    <div className="space-y-4">
      <div>
        {stats.map(({ name, value, minValue, maxValue, percentage }) => (
          <div key={name} className="flex items-center gap-3 py-1.5 md:gap-4">
            <span className="dark:text-bluewood-100 w-12 text-sm font-bold text-gray-900 md:w-14">
              {name}
            </span>
            <span className="dark:text-bluewood-400 w-8 text-right text-base text-gray-500">
              {value}
            </span>

            <div className="dark:bg-bluewood-950 h-2 flex-1 overflow-hidden rounded-full bg-gray-100 transition-colors duration-300">
              <div
                className={`h-full rounded-full ${bgTypePrimaryColors[type]}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className="dark:text-bluewood-400 w-8 text-right text-base text-gray-500">
              {minValue}
            </span>
            <span className="dark:text-bluewood-400 w-8 text-right text-base text-gray-500">
              {maxValue}
            </span>
          </div>
        ))}

        <div className="dark:text-bluewood-100 flex items-center gap-3 pt-1 font-bold text-gray-900 md:gap-4">
          <span className="w-12 text-sm font-bold md:w-14">Total</span>
          <span className="w-8 text-lg">{total}</span>
          <div className="flex-1"></div>
          <span>Min</span>
          <span>Max</span>
        </div>
      </div>
      <p className="dark:text-bluewood-500 text-sm text-gray-400 italic">
        The ranges shown on the top are for a level 100 Pokémon. Maximum values
        are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are
        based on a hindering nature, 0 EVs, 0 IVs.
      </p>
    </div>
  );
}
