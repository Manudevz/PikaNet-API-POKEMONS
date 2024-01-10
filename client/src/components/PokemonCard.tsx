import { Pokemons } from "../types";

type PokemonCardProps = {
  pokemon: Pokemons;
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

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="pokemon_card_container" >
      <div className="content_card">
        <div className="top_section"   >
          <img className="imgPokemon" style={{ height: '96px', width: '96px', marginTop: '-50px' }} src={pokemon.sprites.front_default || '../assets/images/pokemon_not_imgEncountered.png'} alt={pokemon.name} />
        </div>
        <p>N° {pokemon.id}</p>
        <h3>{pokemon.name}</h3>
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
