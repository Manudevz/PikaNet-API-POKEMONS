import MenuOptions from '../components/MenuOptions';
import DisplayPokemons from '../components/DisplayPokemons';
import { usePokemonContext } from '../context/PokemonsAppContext';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { Pokemons } from '../types';



export const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemons | undefined>(undefined);

  const { allPokemons, loader, setLoader } = usePokemonContext();

  useEffect(() => {
    setTimeout(() => setLoader(false), 3400);
  }, [setLoader]);

  const handlePokemonClick = (id?: number | string | undefined) => {
    const foundPokemon = allPokemons.find((p: Pokemons) => id === p.id);
    setPokemon(foundPokemon as Pokemons | undefined);
  };

  const closePokemonDetail = () => {
    setPokemon(undefined);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <main className="flex relative">
          <DisplayPokemons handlePokemonClick={handlePokemonClick} />
          <MenuOptions pokemon={pokemon} closePokemonDetail={closePokemonDetail} />
        </main>
      )}
    </>
  );
};
