import { useState } from "react";
import { usePokemonContext } from "../context/PokemonsAppContext";
import Pagination from "./Pagination";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearcher } from "./PokemonSearcher";
import { Pokemons } from "../context/PokemonsAppContext";
import { DNA } from "react-loader-spinner";

type DisplayPokemonsProps = {
  handlePokemonClick: (id: number | string | undefined) => void

}

const DisplayPokemons = ({ handlePokemonClick }: DisplayPokemonsProps) => {
  const { pokemons, currentPage, setCurrentPage, allPokemons, changePage } = usePokemonContext();
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
    <div>
      {changePage ? (
        <div className="h-[110vh] w-full">
          <div className="w-full h-full flex justify-center items-center flex-col">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <p className="pl-1 mt-0">loading...</p>
          </div>
        </div>


      ) : (
        <section style={{ width: '100%' }}>
          <PokemonSearcher searchedPokemon={searchedPokemon} handleSearchedPokemon={handleSearchedPokemon} />
          {Array.isArray(pokemons) && pokemons.length && !searchedPokemon ? (
            <>
              <div className="pokemon_container">
                {pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
                ))}
              </div>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </>
          ) : (
            <>
              <div className="pokemon_container">
                {pokemonsSelected.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default DisplayPokemons;
