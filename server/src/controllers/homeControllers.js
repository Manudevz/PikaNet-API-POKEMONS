const axios = require("axios");
const urlPath = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

const getPokemonsFromApi = async () => {
	try {
		const pokemonsPromises = await axios.get(urlPath);
		if (pokemonsPromises.status === 200) {
			const {
				data: { results: pokemonsArray },
			} = pokemonsPromises;

			const pokemonDetailsPromises = pokemonsArray.map(async (pokemon) => {
				try {
					const pokemonData = await axios.get(pokemon.url);
					return pokemonData.data;
				} catch (error) {
					console.error(
						`Error fetching details for ${pokemon.name}:`,
						error.message
					);
					return null; // Handle the error by returning null
				}
			});

			const pokemonDetails = await Promise.allSettled(pokemonDetailsPromises);

			// Filter out failed promises and extract the resolved values
			const successfulPokemonDetails = pokemonDetails
				.filter((result) => result.status === "fulfilled")
				.map((result) => result.value);

			// flat each Pokémon object with an imagePokemon property
			const enhancedPokemonDetails = successfulPokemonDetails.map((pokemon) => {
				const imageUrl =
					pokemon.sprites?.other?.showdown?.front_default || null;
				return { ...pokemon, imagePokemon: imageUrl };
			});

			return enhancedPokemonDetails;
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = getPokemonsFromApi;
