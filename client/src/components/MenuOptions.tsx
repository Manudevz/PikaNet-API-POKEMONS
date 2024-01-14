
import { Pokemons } from "../types"

type MenuOptionsProps = {
  pokemon?: Pokemons | undefined;
  closePokemonDetail: () => void;
}

const MenuOptions = ({ pokemon, closePokemonDetail }: MenuOptionsProps) => {
  return (
    <>
      {
        !pokemon ? <section className="details_pokemon">
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
          </section>
      }

    </>
  )
}

export default MenuOptions