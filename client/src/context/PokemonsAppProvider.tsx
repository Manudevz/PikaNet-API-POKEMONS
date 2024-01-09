import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from 'axios';
import PokemonContext from "./PokemonsAppContext";
import { PokemonProviderProps, Pokemons } from '../types/index';

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getPokemons = async () => {
      try {
        const response = await axios.get<Pokemons[]>('http://localhost:3000', {
          cancelToken: source.token
        });
        const pokemonsFromServer: Pokemons[] = response.data;
        setPokemons(pokemonsFromServer);
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was canceled, handle as needed
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching Pokemon data:', error);
        }
      }
    };

    getPokemons();

    // Cleanup function
    return () => {
      source.cancel('closed by the user.');
    };
  }, []);


  console.log("🚀 ~ file: PokemonsAppProvider.tsx:17 ~ pokemons:", pokemons);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
