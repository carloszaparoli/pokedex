import Head from 'next/head'
import { Header } from '../components/Header'
import { PokemonList } from '../components/PokemonList'
import { Search } from '../components/Search'

import styles from './styles/index.module.scss'

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

export default function Home() {

  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <Search />
        <PokemonList />
      </main>
    </>
  )
}
