import { Pokemons } from "../context/PokemonsAppContext";
import { capitalizeFirstLetter } from "../utils";

type PokemonCardProps = {
  pokemon: Pokemons;
  handlePokemonClick: (id: number | string | undefined) => void
};

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

export const PokemonCard = ({ pokemon, handlePokemonClick }: PokemonCardProps) => {


  return (
    <div className="pokemon_card_container" onClick={() => handlePokemonClick(pokemon.id)} >
      <div className="content_card">
        <div className="top_section"   >
          <img className="imgPokemon" style={{ height: '96px', width: '96px', marginTop: '-50px' }} src={pokemon.sprites.front_default || pokemon?.imagePokemon || '../../public/images/pokemon_not_imgEncountered-removebg-preview.png'} alt={pokemon.name} />
        </div>
        <p className="content_card_order_text">N° {pokemon.id}</p>
        <h3 className="content_card_name_text">{capitalizeFirstLetter(pokemon.name)}</h3>
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
      </div>
    </div>
  );
};
