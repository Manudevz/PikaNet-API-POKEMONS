const axios = require("axios");

const getPokemonsFromApi = async (offSet) => {
	const urlPath = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=21`;
	console.log("🚀 ~ getPokemonsFromApi ~ offSet:", offSet);
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
				const types = pokemon.types.map((object) => object.type.name);
				return { ...pokemon, imagePokemon: imageUrl, typesPokemon: types };
			});

			return enhancedPokemonDetails;
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = getPokemonsFromApi;
