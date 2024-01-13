import MenuOptions from '../components/MenuOptions'
import DisplayPokemons from '../components/DisplayPokemons'
import { usePokemonContext } from '../context/PokemonsAppContext';
import { Loader } from '../components/Loader';
import { useEffect } from 'react';

export const Home = () => {
  const { loader, setLoader } = usePokemonContext();

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)

  }, [loader, setLoader])
  return (
    <>
      {
        loader
          ? <Loader />
          : <main className="flex relative">
            <DisplayPokemons />
            <MenuOptions />
          </main >
      }

    </>
  )
}
