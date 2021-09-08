import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type PokemonBasicData = {
    name: string;
    url: string;
}

type Pokemon = {
    id: number;
    idAsString: string;
    name: string;
    nameLowerCase: string;
    image: string;
    types: Type[];
}

type Type = {
    name: string
}

type PlayerContextData = {
    allPokemons: PokemonBasicData[];
    setAllPokemons: Dispatch<SetStateAction<PokemonBasicData[]>>;
    filteredPokemons: PokemonBasicData[];
    setFilteredPokemons: Dispatch<SetStateAction<PokemonBasicData[]>>;
    backupListPokemons: PokemonBasicData[];
    setBackupListPokemons: Dispatch<SetStateAction<PokemonBasicData[]>>;

    pokemons: Pokemon[];
    setPokemons: Dispatch<SetStateAction<Pokemon[]>>;

    selectedType: string;
    setSelectedType: Dispatch<SetStateAction<String>>;
    searchText: string;
    setSearchText: Dispatch<SetStateAction<String>>;
    filterMode: boolean;
    setFilterMode: Dispatch<SetStateAction<Boolean>>;
    to: number;
    setTo: Dispatch<SetStateAction<Number>>;
    typeIsSelected: boolean;
    setTypeIsSelected: Dispatch<SetStateAction<Boolean>>;
}

export const PokemonContext = createContext({} as PlayerContextData)

type PokemonContextProviderProps = {
    children: ReactNode;
}

export function PokemonContextProvider({ children }: PokemonContextProviderProps) {
    const [allPokemons, setAllPokemons] = useState<PokemonBasicData[]>([])
    const [filteredPokemons, setFilteredPokemons] = useState<PokemonBasicData[]>([])
    const [backupListPokemons, setBackupListPokemons] = useState<PokemonBasicData[]>([])

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    const [selectedType, setSelectedType] = useState("")
    const [searchText, setSearchText] = useState("")
    const [filterMode, setFilterMode] = useState(false)
    const [to, setTo] = useState(0)
    const [typeIsSelected, setTypeIsSelected] = useState(false)

    return (
        <PokemonContext.Provider
            value={{
                allPokemons,
                setAllPokemons,
                filteredPokemons,
                setFilteredPokemons,
                backupListPokemons,
                setBackupListPokemons,
                pokemons,
                setPokemons,
                selectedType,
                setSelectedType,
                searchText,
                setSearchText,
                filterMode,
                setFilterMode,
                to,
                setTo,
                typeIsSelected,
                setTypeIsSelected,
            }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemon = () => {
    return useContext(PokemonContext);
}