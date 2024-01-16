import { useState } from "react";
import { usePokemonContext } from "../context/PokemonsAppContext";
import Pagination from "./Pagination";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearcher } from "./PokemonSearcher";
import { Pokemons } from "../context/PokemonsAppContext";

type DisplayPokemonsProps = {
  handlePokemonClick: (id: number | string | undefined) => void

}

const DisplayPokemons = ({ handlePokemonClick }: DisplayPokemonsProps) => {
  const { pokemons, currentPage, setCurrentPage, allPokemons } = usePokemonContext();
  const [pokemonsSelected, setPokemonsSelected] = useState<Pokemons[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState("");

  const filterPokemons = (searchedText: string) => {
    return allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchedText.toLowerCase())
    );
  };


  const handleSearchedPokemon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchedPokemon(searchText);

    setPokemonsSelected(filterPokemons(searchText));
  };

  return (
    <section style={{ width: '100%' }} className="display_pokemons_list">
      <PokemonSearcher searchedPokemon={searchedPokemon} handleSearchedPokemon={handleSearchedPokemon} />
      {
        Array.isArray(pokemons) && pokemons.length && !searchedPokemon
          ?
          <>
            <div className="pokemon_container">
              {
                pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
                ))
              }
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
          :
          <>
            <div className="pokemon_container">
              {
                pokemonsSelected.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
                ))
              }
            </div>
          </>
      }
    </section>
  );
};

export default DisplayPokemons;
