const axios = require("axios");
const urlPath = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";

const getPokemonsFromApi = async () => {
	try {
		const pokemonsPromises = await axios.get(urlPath);
		if (pokemonsPromises.status === 200) {
			const {
				data: { results: pokemonsArray },
			} = pokemonsPromises;

			return Promise.all(
				pokemonsArray.map(async (pokemon) => {
					const pokemonData = await axios.get(pokemon.url);
					return pokemonData.data;
				})
			);
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = getPokemonsFromApi;
