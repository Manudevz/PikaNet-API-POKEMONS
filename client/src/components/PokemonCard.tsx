import { Pokemons } from "../types"

type PokemonCard = {
  pokemon: Pokemons
}

export const PokemonCard = ({ pokemon }: PokemonCard) => {
  return (
    <div className="pokemon_card_container">
      {pokemon.name} <img style={{ maxHeight: 100, maxWidth: 80 }} src={pokemon.imagePokemon} alt={pokemon.name} />
    </div>
  )
}
