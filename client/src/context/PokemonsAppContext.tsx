/* eslint-disable react-refresh/only-export-components */
// context/PokemonContext.tsx

import { createContext, useContext } from "react";

type Pokemons = {
  name: string;
  imagePokemon: string;
};

interface PokemonContextProps {
  pokemons: Pokemons[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemons[]>>;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};

export default PokemonContext;
