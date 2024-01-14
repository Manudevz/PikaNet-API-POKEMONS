
import { Pokemons } from "../types"

type MenuOptionsProps = {
  pokemon?: Pokemons | undefined;
  closePokemonDetail: () => void;
}

const typeColorMappings: Record<string, string> = {
  normal: '#A8A77A',
  poison: '#BC76AE',
  grass: '#93D776',
  fire: '#FF6849',
  water: '#6390F0',
  electric: '#F7D02C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const MenuOptions = ({ pokemon, closePokemonDetail }: MenuOptionsProps) => {
  return (
    <>
      {
        !pokemon ? <section className="details_pokemon hidden md:flex" >
          <img className="details_pokemon_img" width={100} height={100} src="../../public/images/no-pokemon-selected.png" alt="" />
          <h2 className="relative bottom-20 details_pokemon_colortext">Select a pokemon</h2>
          <h2 className="relative bottom-20 details_pokemon_colortext">to display here.</h2>
        </section>
          :
          <section className="details_pokemon_selected">
            <div className="circle">
              <button className="exit_details" onClick={closePokemonDetail}>
                x
              </button>
              <img className="img_details" src={pokemon.imagePokemon} alt="" />
            </div>
            <h2 className="pokemon_name">{pokemon.name}</h2>
            <div>
              {pokemon?.typesPokemon?.map((type: string) => (
                <span
                  key={type}
                  className="pokemon_types"
                  style={{
                    backgroundColor: typeColorMappings[type] || 'transparent',
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </section>
      }

    </>
  )
}

export default MenuOptions