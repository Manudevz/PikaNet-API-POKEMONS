// DisplayPokemons.tsx
import { usePokemonContext } from "../context/PokemonsAppContext";
import { PokemonCard } from './PokemonCard';

const DisplayPokemons = () => {
  const { pokemons } = usePokemonContext();

  return (
    <div className="pokemon_container">
      {
        pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))
      }
    </div>
  );
}

export default DisplayPokemons;
