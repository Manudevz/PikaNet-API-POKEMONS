
import { Pokemons } from "../types"

type MenuOptionsProps = {
  pokemon: Pokemons
}

const MenuOptions = ({ pokemon }: MenuOptionsProps) => {
  console.log("🚀 ~ MenuOptions ~ pokemon:", pokemon)
  return (
    <>
      {
        !pokemon ? <section className="details_pokemon">
          <img className="details_pokemon_img" width={100} height={100} src="../../public/images/no-pokemon-selected.png" alt="" />
          <h2 className="relative bottom-20 details_pokemon_colortext">Select a pokemon</h2>
          <h2 className="relative bottom-20 details_pokemon_colortext">to display here.</h2>
        </section>
          :
          <section className="details_pokemon">
            <h1>{pokemon.name}</h1>
          </section>
      }

    </>
  )
}

export default MenuOptions