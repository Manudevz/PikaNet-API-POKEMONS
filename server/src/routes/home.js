const { Router } = require("express");
const getPokemonsFromApi = require("../controllers/homeControllers");

const routes = Router();

routes.get("/pokemons", async (req, res) => {
	const offset = req.query.offset;
	const pokemons = await getPokemonsFromApi(offset);
	res.json(pokemons);
});

module.exports = routes;
