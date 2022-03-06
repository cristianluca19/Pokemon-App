const express = require("express");

const {
  postPokemon,
  getPokemon,
  getSinglePokemon,
  putPokemon,
  deletePokemon,
} = require("../controllers/pokemons");

//Creating routes and adding the controllers.

const pokemonRouter = express.Router();

pokemonRouter.get("/pokemons", getPokemon);

pokemonRouter.get("/pokemons/:id", getSinglePokemon);

pokemonRouter.post("/pokemons", postPokemon);

//L8r
pokemonRouter.put("/pokemons/:id", putPokemon);

//L8r
pokemonRouter.delete("/pokemons/:id", deletePokemon);

module.exports = pokemonRouter;
