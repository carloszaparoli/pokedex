import { POKEMON_TYPE_LABELS } from "@/constants/pokemon";
import { PokemonType } from "@/types/pokemon";
import { X } from "lucide-react";

interface PokemonFilterResultsProps {
  totalPokemon: number;
  selectedType: PokemonType | null;
  searchQuery: string;
  loading: boolean;
  onCleanFilter: () => void;
}

export function PokemonFilterResults({
  totalPokemon,
  selectedType,
  searchQuery,
  loading,
  onCleanFilter,
}: PokemonFilterResultsProps) {
  const typeLabel = selectedType ? POKEMON_TYPE_LABELS[selectedType] : "";
  const searchLabel = searchQuery ? `"${searchQuery}"` : "";
  const showType = Boolean(selectedType);
  const showSearch = Boolean(searchQuery);

  return (
    <div className="dark:border-bluewood-800 dark:text-bluewood-400 flex items-center justify-between gap-2 border-b border-gray-200 py-3 text-gray-500 transition-colors duration-300">
      {loading ? (
        <div className="dark:bg-bluewood-800 my-0.5 h-[20px] w-[200px] animate-pulse rounded-sm bg-gray-200 transition-colors duration-300" />
      ) : (
        <>
          <div className="text-sm md:text-base">
            <span>
              <strong>{totalPokemon}</strong> Pokémon found{" "}
              {showSearch && (
                <>
                  for <strong>{searchLabel}</strong>
                </>
              )}
              {showType && (
                <>
                  {" "}
                  of type <strong>{typeLabel}</strong>
                </>
              )}
            </span>
          </div>

          {(showType || showSearch) && (
            <button
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-red-200 hover:text-red-500"
              onClick={onCleanFilter}
            >
              <X className="size-4" />
              Clean filter
            </button>
          )}
        </>
      )}
    </div>
  );
}
