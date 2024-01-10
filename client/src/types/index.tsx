import { ReactNode } from "react";

export type Pokemons = {
  sprites: {
    front_default: string;
  };
  typesPokemon?: string[];
  id?: number | string;
  name: string;
  imagePokemon: string;

};

export type PokemonProviderProps = {
  children: ReactNode;
}

