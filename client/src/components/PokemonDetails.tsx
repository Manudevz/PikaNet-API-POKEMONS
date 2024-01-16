
import { useEffect } from "react";
import { Ability, Pokemons, Stats } from "../context/PokemonsAppContext";
import { capitalizeFirstLetter } from "../utils";
import { DNA } from "react-loader-spinner";

type MenuOptionsProps = {
  pokemon?: Pokemons | undefined;
  closePokemonDetail: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

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


export const PokemonDetails = ({ pokemon, closePokemonDetail, loading, setLoading }: MenuOptionsProps) => {
  const formattedWeight: string = pokemon?.weight !== undefined
    ? `${(Number(pokemon?.weight) / 10).toFixed(1)} kg`
    : "";
  const formattedHeight: string = pokemon?.height !== undefined
    ? `${(Number(pokemon?.height) / 10).toFixed(1)} m`
    : "";

  useEffect(() => {
    if (pokemon) {
      const imgElement = new Image();
      imgElement.src = pokemon.imagePokemon || pokemon.sprites.front_default || '../../public/images/pokemon_not_imgEncountered-removebg-preview.png';

      const handleImageLoad = () => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      };

      imgElement.addEventListener('load', handleImageLoad);

      return () => {
        imgElement.removeEventListener('load', handleImageLoad);
      };
    }
  }, [setLoading, pokemon]);

  return (
    <>
      {
        !loading
          ?
          <section className="details_pokemon_selected text-center">
            <div className="circle">
              <button className="exit_details" onClick={closePokemonDetail}>
                x
              </button>
              <img
                className="img_details"
                src={pokemon?.imagePokemon || pokemon?.sprites.front_default || '../../public/images/pokemon_not_imgEncountered-removebg-preview.png'}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = '../../public/images/pokemon_not_imgEncountered-removebg-preview.png';
                }}
              />

            </div>
            <p className="content_card_order_text mt-1">N° {pokemon?.id}</p>
            <h2 className="pokemon_name mt-0 font-bold">{capitalizeFirstLetter(pokemon?.name ?? '')}</h2>
            <div className="mt-3">
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
            <h4 className="font-bold mt-3">Pokedex Entry</h4>
            <p className=" entry-text mt-2 leading-4  md:leading-5">{pokemon?.speciesData}</p>
            <div className="flex mt-3 gap-3 w-full justify-center px-3">
              <div className="w-3/4 ">
                <h4 className="font-bold">Height</h4>
                <p className="w-full bg-blue-100 rounded-lg mt-2 h-7  flex items-center justify-center">{formattedHeight}</p>
              </div>
              <div className="w-3/4 ">
                <h4 className="font-bold">Weight</h4>
                <p className="w-full bg-blue-100 rounded-lg mt-2 h-7  flex items-center justify-center">
                  {formattedWeight}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center flex-col mt-1 px-3">
              <h4 className="font-bold mt-2">Abilities</h4>
              <div className="flex gap-3">
                {
                  pokemon?.abilities.slice(0, 2).map((element: Ability, index: number) => (
                    <div key={index} className="w-3/4">
                      <p key={`${index}${element.ability.name}`} className="w-full bg-blue-100 mt-2 rounded-lg h-7  flex items-center justify-center">
                        {element.ability.name}
                      </p>
                    </div>

                  ))
                }
              </div>
            </div>
            <div className="flex w-full justify-center flex-col mt-1 px-3">
              <h4 className="font-bold mt-1">Stats</h4>
              <div className="flex justify-evenly">
                {pokemon?.stats.map((element: Stats, index: number) => (
                  <div key={index} className="flex flex-col container-stat bg-blue-100">
                    <h6 className={`circle-stat text-10 font-bold text-white rounded-full ${element.stat.name === 'hp' ? 'bg-red-500' :
                      element.stat.name === 'attack' ? 'bg-orange-500 ' :
                        element.stat.name === 'defense' ? 'bg-green-500' :
                          element.stat.name === 'special-attack' ? 'bg-blue-400' :
                            element.stat.name === 'special-defense' ? 'bg-yellow-500' :
                              element.stat.name === 'speed' ? 'bg-gray-500' : ''
                      }`}>
                      {element.stat.name === 'hp' ? 'HP' :
                        element.stat.name === 'attack' ? 'ATK' :
                          element.stat.name === 'defense' ? 'DEF' :
                            element.stat.name === 'special-attack' ? 'SpA' :
                              element.stat.name === 'special-defense' ? 'SpD' :
                                element.stat.name === 'speed' ? 'SPD' : ''}
                    </h6>
                    <p className="text-12 font-bold">{element.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>
          :
          <section className="details_pokemon_selected flex flex-col justify-center items-center">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <p>loading...</p>
          </section>
      }
    </>
  )
}
