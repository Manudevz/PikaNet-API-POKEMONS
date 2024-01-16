/* eslint-disable react-refresh/only-export-components */
// context/PokemonContext.tsx

import { ReactNode, createContext, useContext } from "react";

export type PokemonProviderProps = {
  children: ReactNode;
}


export type ApiResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

export type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type Stats = {
  base_stat: string;
  stat: {
    name: string;
    url: string
  }
}

export type Pokemons = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  types: any;
  sprites: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    other: any;
    front_default: string;
  };
  typesPokemon?: string[];
  id?: number | string;
  name: string;
  imagePokemon: string;
  species?: {
    url: string;
  } | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  speciesData?: string;
  weight: string;
  height: string;
  abilities: Ability[];
  stats: Stats[]

};


interface PokemonContextProps {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  pokemons: Pokemons[];
  allPokemons: Pokemons[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemons[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
