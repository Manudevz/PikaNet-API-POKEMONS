import { ReactNode } from "react";

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

};

export type PokemonProviderProps = {
  children: ReactNode;
}


export type ApiResponse = {
  results: {
    name: string;
    url: string;
  }[];
};
