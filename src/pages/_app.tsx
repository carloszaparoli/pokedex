import { ToastContainer } from 'react-toastify';
import { PokemonContextProvider } from '../contexts/PokemonContext';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss'
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <PokemonContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </PokemonContextProvider>
    </ThemeProvider>
  )
}

export default MyApp