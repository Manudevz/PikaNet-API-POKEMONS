import { ReactNode } from "react";

export type Pokemons = {
  name: string;
  imagePokemon: string;
};

export type PokemonProviderProps = {
  children: ReactNode;
}