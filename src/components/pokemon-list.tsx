import { Pokemon } from "@/types/pokemon";
import { Button } from "./button";
import { PokeballIcon } from "./pokeball-icon";
import { PokemonCard } from "./pokemon-card";
import { PokemonSkeletonCard } from "./pokemon-skeleton-card";

interface PokemonListProps {
  pokemons: Pokemon[];
  loading: boolean;
  page: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
}

export function PokemonList({
  pokemons,
  loading,
  page,
  totalPages,
  onChangePage,
}: PokemonListProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 mb-12 min-h-[670px]">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {loading &&
          Array.from({ length: 15 }).map((_i, index) => (
            <PokemonSkeletonCard key={index} />
          ))}
      </div>

      {/* <div className="flex items-center justify-center gap-5 ">
        <button
          className="h-12 px-5 border border-red-200 "
          disabled={page === 1}
          onClick={() => onChangePage(Math.max(page - 1, 1))}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          className="h-12 px-5 border border-red-200 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => onChangePage(Math.min(page + 1, totalPages))}
        >
          Próxima
        </button>
      </div> */}

      {page < totalPages && (
        <Button
          className="mx-auto px-6 gap-3"
          disabled={loading}
          onClick={() => onChangePage(Math.min(page + 1, totalPages))}
        >
          {loading && <PokeballIcon className="size-5 animate-spin " />}
          Load more
        </Button>
      )}
    </div>
  );
}
