import { usePokemonContext } from '../context/PokemonsAppContext';
import { Loader } from '../components/Loader';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Pokemons } from '../context/PokemonsAppContext';
import MenuOptions from '../components/MenuOptions';
import DisplayPokemons from '../components/DisplayPokemons';
import axios from 'axios';
import { capitalizeFirstLetter } from '../utils';

type Element = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  }
}
export const Home = () => {
  const [pokemon, setPokemon] = useState<Pokemons | undefined>(undefined);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
  const [loading, setLoading] = useState(true)

  const { allPokemons, loader, setLoader } = usePokemonContext();

  useLayoutEffect(() => {
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

  const fetchSpeciesData = async (speciesUrl: string) => {
    try {
      const speciesResponse = await axios.get(speciesUrl);
      return speciesResponse.data;
    } catch (error) {
      console.error('Error fetching species data:', (error as Error).message);
      return null;
    }
  };

  const handlePokemonClick = async (id?: number | string | undefined) => {
    setLoading(true)
    const foundPokemon = allPokemons.find((p: Pokemons) => id === p.id);

    if (foundPokemon && foundPokemon.species) {

      const speciesData = await fetchSpeciesData(foundPokemon.species.url);
      const entryPokemon = speciesData.flavor_text_entries.find((element: Element) => {
        if (element.language.name.toLocaleLowerCase() === 'en') {
          return element.language
        }
      })

      if (speciesData) {
        setPokemon({
          ...foundPokemon,
          speciesData: capitalizeFirstLetter(entryPokemon.flavor_text.replace(/[\n\r\f\\]/g, ' ').toLowerCase())
        });
      }
    }
  };



  const closePokemonDetail = () => {
    setPokemon(undefined);
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <main className="md:flex relative">
          <div className='flex absolute top-1 left-1 justify-center items-center'>
            <a href="https://github.com/Manudevz" target="_blank" rel="noopener noreferrer">
              <img width={40} height={40} src="../../images/github.png" alt="github-logo" />
            </a>
            <a href="https://github.com/Manudevz" target="_blank" rel="noopener noreferrer" className="text-red-500 pl-2">
              Manudevz
            </a>
          </div>
          <div style={{ width: '100%' }} className={`${isMobileView ? (pokemon ? 'none' : 'block') : 'block'}`}>
            <DisplayPokemons handlePokemonClick={handlePokemonClick} />
          </div>
          <MenuOptions pokemon={pokemon} closePokemonDetail={closePokemonDetail} setLoading={setLoading} loading={loading} />
        </main>
      )}
    </>
  );
};