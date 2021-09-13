import Head from 'next/head'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { PokemonList } from '../components/PokemonList'

import styles from './styles/index.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1>Welcome to Pokédex!</h1>
          <p>Search for Pokémon by name or if you prefer, filter by type.</p>
        </div>
        <PokemonList />
      </main>
    </>
  )
}