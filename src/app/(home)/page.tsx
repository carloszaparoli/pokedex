"use client";

import {
  getAllPokemonUrls,
  getPokemonDetailsByUrl,
  getPokemonUrlsByType,
} from "@/services/pokemon";
import { PokemonList } from "@/components/pokemon-list";
import { PokemonFilters } from "@/components/pokemon-filters";
import { useEffect, useMemo, useState } from "react";
import { Pokemon, PokemonType, PokemonUrl } from "@/types/pokemon";
import { useSearchParams } from "next/navigation";
import { NoPokemonFound } from "@/components/no-pokemon-found";
import { PokemonFilterResults } from "@/components/pokemon-filter-results";

export default function HomePage() {
  const searchParams = useSearchParams();
  // const router = useRouter();

  const [allPokemonUrls, setAllPokemonUrls] = useState<PokemonUrl[]>([]);
  const [filteredPokemonUrls, setFilteredPokemonUrls] = useState<PokemonUrl[]>(
    []
  );
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoadingUrls, setIsLoadingUrls] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

  const POKEMONS_PER_PAGE = 15;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeSearchQuery = (value: string) => {
    setSearchQuery(value);
    // setPokemons([]);
  };

  const handleSelectType = (type: PokemonType | null) => {
    // setPokemons([]);
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  const handleCleanFilter = () => {
    setSelectedType(null);
    setSearchQuery("");
    // setPokemons([]);
  };

  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   params.set("page", page.toString());
  //   router.replace(`?${params.toString()}`, { scroll: false });
  // }, [page, router]);

  useEffect(() => {
    async function fetchAllUrls() {
      setIsLoadingUrls(true);
      const { results, count } = await getAllPokemonUrls();

      setTotalPokemon(count);
      setAllPokemonUrls(results);
      setFilteredPokemonUrls(results);

      setIsLoadingUrls(false);
    }

    fetchAllUrls();
  }, []);

  useEffect(() => {
    async function filterPokemons() {
      let filteredUrls = allPokemonUrls;

      if (selectedType) {
        filteredUrls = await getPokemonUrlsByType(selectedType);
      }

      if (searchQuery) {
        filteredUrls = filteredUrls.filter((pokemon) =>
          pokemon.name.includes(searchQuery.toLowerCase())
        );
      }

      setTotalPokemon(filteredUrls.length);
      setFilteredPokemonUrls(filteredUrls);
      setPage(1);
    }

    filterPokemons();
  }, [searchQuery, selectedType, allPokemonUrls]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPokemonUrls.length / POKEMONS_PER_PAGE),
    [filteredPokemonUrls.length]
  );

  const paginatedUrls = useMemo(() => {
    const start = (page - 1) * POKEMONS_PER_PAGE;
    const end = start + POKEMONS_PER_PAGE;
    return filteredPokemonUrls.slice(start, end);
  }, [filteredPokemonUrls, page]);

  useEffect(() => {
    if (paginatedUrls.length === 0) return;

    async function fetchPokemonDetails() {
      setIsLoadingDetails(true);
      const details = await Promise.all(
        paginatedUrls.map((p) => getPokemonDetailsByUrl(p.url))
      );
      setPokemons(details);
      setIsLoadingDetails(false);
    }

    fetchPokemonDetails();
  }, [paginatedUrls]);

  const noPokemonFound =
    Boolean(totalPokemon === 0) &&
    (Boolean(selectedType) || Boolean(searchQuery));

  return (
    <>
      <div className="py-8 space-y-10">
        <div className="space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-center leading-none mb-4">
              Welcome to the Pokédex! 🔥
            </h1>
            <p className="text-gray-500 dark:text-bluewood-400 text-center">
              Search for your favorite Pokémon by name or explore them by type
            </p>
          </div>

          <PokemonFilters
            searchQuery={searchQuery}
            selectedType={selectedType}
            onSearch={handleChangeSearchQuery}
            onSelectType={handleSelectType}
            disabledFilters={isLoadingDetails}
          />
        </div>

        {noPokemonFound ? (
          <NoPokemonFound />
        ) : (
          <div className="space-y-5">
            <PokemonFilterResults
              searchQuery={searchQuery}
              selectedType={selectedType}
              totalPokemon={totalPokemon}
              loading={isLoadingUrls}
              onCleanFilter={handleCleanFilter}
            />

            <PokemonList
              loading={isLoadingDetails}
              pokemons={pokemons}
              page={page}
              totalPages={totalPages}
              pokemonsPerPage={POKEMONS_PER_PAGE}
              onChangePage={handleChangePage}
            />
          </div>
        )}
      </div>
    </>
  );
}
