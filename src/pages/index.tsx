import Head from 'next/head'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  }
}

export default function Home() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    api.get('pokemon')
      .then(res => res.data)
      .then(allPokemon => {
        allPokemon.results.forEach(pokemon => {
          console.log(pokemon);
          fetchPokemonData(pokemon)
            .then(data => setPokemons)
        })
      })
  }, [])

  const fetchPokemonData = async (pokemon) => {
    api.get(pokemon.url)
      .then(res => res.data)
      .then(pokeData => {

        let data: Pokemon = {
          name: pokeData.name,
          sprites: {
            front_default: pokeData.sprites.front_default
          }
        }

        return data
      })
  }

  return (
    <div>
      <Head>
        <title>Pokédex</title>
      </Head>
      <img src="./logo.svg" alt="Pokémon" width={200} />
      <div>
        {pokemons.map(pokemon => (
          <div key={pokemon.name}>
            <img src={pokemon.sprites.front_default} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
