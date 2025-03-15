import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "./pokemon-card";
import { PokemonSkeletonCard } from "./pokemon-skeleton-card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PokemonListProps {
  pokemons: Pokemon[];
  loading: boolean;
  page: number;
  totalPages: number;
  pokemonsPerPage: number;
  onChangePage: (newPage: number) => void;
}

export function PokemonList({
  pokemons,
  loading,
  page,
  totalPages,
  pokemonsPerPage,
  onChangePage,
}: PokemonListProps) {
  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-5 md:mb-12 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: pokemonsPerPage }).map((_i, index) => (
              <PokemonSkeletonCard key={index} />
            ))
          : pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>
      <div className="flex items-center justify-between gap-2 md:justify-center md:gap-5">
        <button
          title="First page"
          className="dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 flex size-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-200 transition-colors duration-300 not-disabled:cursor-pointer not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:text-white disabled:opacity-50 dark:not-disabled:hover:border-red-200 dark:not-disabled:hover:bg-red-200"
          disabled={page === 1}
          onClick={() => onChangePage(1)}
        >
          <ChevronsLeft />
        </button>
        <button
          title="Previous page"
          className="dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 flex size-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-200 transition-colors duration-300 not-disabled:cursor-pointer not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:text-white disabled:opacity-50 dark:not-disabled:hover:border-red-200 dark:not-disabled:hover:bg-red-200"
          disabled={page === 1}
          onClick={() => onChangePage(Math.max(page - 1, 1))}
        >
          <ChevronLeft />
        </button>
        <span className="dark:text-bluewood-400 text-gray-600">
          page {page} of {totalPages}
        </span>
        <button
          title="Next page"
          className="dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 flex size-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-200 transition-colors duration-300 not-disabled:cursor-pointer not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:text-white disabled:opacity-50 dark:not-disabled:hover:border-red-200 dark:not-disabled:hover:bg-red-200"
          disabled={page === totalPages}
          onClick={() => onChangePage(Math.min(page + 1, totalPages))}
        >
          <ChevronRight />
        </button>
        <button
          title="Last page"
          className="dark:bg-bluewood-900 dark:border-bluewood-800 dark:text-bluewood-100 flex size-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-200 transition-colors duration-300 not-disabled:cursor-pointer not-disabled:hover:border-red-200 not-disabled:hover:bg-red-200 not-disabled:hover:text-white disabled:opacity-50 dark:not-disabled:hover:border-red-200 dark:not-disabled:hover:bg-red-200"
          disabled={page === totalPages}
          onClick={() => onChangePage(totalPages)}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
