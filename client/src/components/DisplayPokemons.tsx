import { useState } from "react";
import { usePokemonContext } from "../context/PokemonsAppContext";
import Pagination from "./Pagination";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearcher } from "./PokemonSearcher";
import { Pokemons } from "../types";

const DisplayPokemons = () => {
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

    // Call the filterPokemons function with the new search text
    setPokemonsSelected(filterPokemons(searchText));
  };




  return (
    <section style={{ width: '100%' }}>
      <PokemonSearcher searchedPokemon={searchedPokemon} handleSearchedPokemon={handleSearchedPokemon} />
      {
        pokemons.length && !searchedPokemon
          ?
          <>
            <div className="pokemon_container">
              {
                pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} />
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
                  <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))
              }
            </div>
          </>
      }
    </section>
  );
};

export default DisplayPokemons;
