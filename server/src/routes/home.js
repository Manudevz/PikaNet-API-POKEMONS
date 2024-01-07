const { Router } = require("express");
const getPokemonsFromApi = require("../controllers/homeControllers");

const routes = Router();
routes.get("/", async (req, res) => {
	const pokemons = await getPokemonsFromApi();
	res.json(pokemons);
});

module.exports = routes;
