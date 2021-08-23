import Head from 'next/head'
import { Header } from '../components/Header'
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
        <PokemonList />
      </main>
    </>
  )
}
