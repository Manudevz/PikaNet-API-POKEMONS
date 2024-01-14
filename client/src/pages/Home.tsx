import { usePokemonContext } from '../context/PokemonsAppContext';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { Pokemons } from '../types';
import MenuOptions from '../components/MenuOptions';
import DisplayPokemons from '../components/DisplayPokemons';

export const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemons | undefined>(undefined);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  const { allPokemons, loader, setLoader } = usePokemonContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setLoader]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 3400);
  }, [setLoader]);

  const handlePokemonClick = (id?: number | string | undefined) => {
    const foundPokemon = allPokemons.find((p: Pokemons) => id === p.id);
    setPokemon(foundPokemon);
  };

  const closePokemonDetail = () => {
    setPokemon(undefined)
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <main className="md:flex relative">
          <div style={{ width: '100%' }} className={`${isMobileView ? (pokemon ? 'none' : 'block') : 'block'}`}>
            <DisplayPokemons handlePokemonClick={handlePokemonClick} />
          </div>

          <MenuOptions pokemon={pokemon} closePokemonDetail={closePokemonDetail} />
        </main>
      )}
    </>
  );
};
