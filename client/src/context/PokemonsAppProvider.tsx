import { useEffect, useState } from "react";
import axios, { CancelTokenSource } from 'axios';
import PokemonContext from "./PokemonsAppContext";
import { ApiResponse, PokemonProviderProps, Pokemons } from '../context/PokemonsAppContext';

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loader, setLoader] = useState(true)
  const [allPokemons, setAllPokemons] = useState<Pokemons[]>([]);

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getPokemons = async (offset: number) => {
      try {
        const response = await axios.get<Pokemons[]>(
          `http://localhost:3000/pokemons?offset=${offset}&limit=20`,
          {
            cancelToken: source.token
          }
        );
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

    getPokemons((currentPage - 1) * 21);

    // Cleanup function
    return () => {
      source.cancel('closed by the user.');

    };
  }, [currentPage]);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const getPokemons = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`,
          {
            cancelToken: source.token
          }
        );

        const pokemonsFromServer = response.data.results;

        // Fetch additional details for each Pokémon
        const detailsPromises = pokemonsFromServer.map(async (pokemon: { url: string }) => {
          const detailResponse = await axios.get<Pokemons>(pokemon.url);
          return detailResponse.data;
        });

        const detailedPokemons = await Promise.all(detailsPromises);
        const enhancedPokemonDetails = detailedPokemons.map((pokemon) => {
          const imageUrl =
            pokemon.sprites?.other?.showdown?.front_default || null;
          const types = pokemon.types.map((object: { type: { name: string; }; }) => object.type.name);
          return { ...pokemon, imagePokemon: imageUrl, typesPokemon: types };
        });
        setAllPokemons(enhancedPokemonDetails);
        setIsDataFetched(true);

      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was canceled, handle as needed
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching Pokemon data:', error);
        }
      }
    };

    // Only fetch data if it hasn't been fetched yet
    if (!isDataFetched) {
      getPokemons();
    }

    // Cleanup function
    return () => {
      source.cancel('closed by the user.');
    };
  }, []);


  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons, currentPage, setCurrentPage, allPokemons, loader, setLoader }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
