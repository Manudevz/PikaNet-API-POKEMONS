
import { Pokemons } from "../context/PokemonsAppContext"
import { PokemonDetails } from "./PokemonDetails";

type MenuOptionsProps = {
  pokemon?: Pokemons | undefined;
  closePokemonDetail: () => void;
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}



const MenuOptions = ({ pokemon, closePokemonDetail, loading, setLoading }: MenuOptionsProps) => {

  return (
    <>
      {
        !pokemon
          ?
          <section className="details_pokemon hidden md:flex" >
            <img className="details_pokemon_img" width={100} height={100} src="../../images/no-pokemon-selected.png" alt="" />
            <h2 className="relative bottom-20 details_pokemon_colortext">Select a pokemon</h2>
            <h2 className="relative bottom-20 details_pokemon_colortext">to display here.</h2>
          </section>
          :
          <PokemonDetails setLoading={setLoading} loading={loading} pokemon={pokemon} closePokemonDetail={closePokemonDetail} />

      }

    </>
  )
}

export default MenuOptions