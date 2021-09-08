import '../styles/global.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PokemonContextProvider } from '../contexts/PokemonContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PokemonContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </PokemonContextProvider>
    </>
  )
}

export default MyApp