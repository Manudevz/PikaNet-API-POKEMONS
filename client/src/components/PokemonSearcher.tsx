import React from 'react';

type PokemonSearcherProps = {
  searchedPokemon: string;
  handleSearchedPokemon: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PokemonSearcher = ({ searchedPokemon, handleSearchedPokemon }: PokemonSearcherProps) => {
  return (
    <div className="searcher_container">
      <input
        className="searcher"
        placeholder="Search your pokemon"
        type="text"
        value={searchedPokemon}
        onChange={handleSearchedPokemon}
      />
      <img
        className="search-icon"
        src="../../images/Lupa_EP-.png"
        alt="Search Icon"
      />
    </div>
  );
};
