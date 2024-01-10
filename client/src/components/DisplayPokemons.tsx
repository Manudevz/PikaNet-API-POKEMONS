import { usePokemonContext } from "../context/PokemonsAppContext";
import Pagination from "./Pagination";
import { PokemonCard } from "./PokemonCard";

const DisplayPokemons = () => {
  const { pokemons, currentPage, setCurrentPage } = usePokemonContext();



  return (
    pokemons.length
      ?
      <section style={{ width: '100%' }}>
        <div className="pokemon_container">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </section>
      :
      <div style={{ width: '100%' }}>

      </div>

  );
};

export default DisplayPokemons;
