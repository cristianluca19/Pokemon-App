const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");
const { getOnePokemon, getApiInfo, getDbInfo, getAllInfo } = require("./utils");

//Get all (or single, by name passed via query) pokemon
const getPokemon = async (req, res) => {
  try {
    const { name } = req.query;
    const allInfo = await getAllInfo();
    if (name) {
      const pokemon = allInfo.find((p) => p.name === name);
      return pokemon
        ? res.send(pokemon)
        : res.status(404).send("Pokemon not found.");
    }
    res.send(allInfo); //If there's no query, shows all pokemon.
  } catch (error) {
    res.status(400).send({ errorMsg: error });
  }
};

//Get single pokemon by ID.
const getSinglePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length <= 3) {
      //If it is from API, we search on the individual endpoint.
      const singlePokemon = await getOnePokemon(id);
      res.send(singlePokemon);
    } else {
      //Else, we search from DB.
      const dbPokemon = await getDbInfo();
      const singlePokemon = dbPokemon.find((poke) => poke.id === id);
      return singlePokemon
        ? res.send(singlePokemon)
        : res.status(404).send("Pokemon not found.");
    }
  } catch (error) {
    res.status(400).send({ errorMsg: error });
  }
};

//Create new pokemon, regardless if the types have been loaded to db or not.
const postPokemon = async (req, res) => {
  try {
    //Just create it as usual.
    const newPokemon = await Pokemon.create({
      name: req.body.name,
      height: req.body.height,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
      weight: req.body.weight,
      img: req.body.img,
    });
    //Here i find all the matching types from client-db
    let typesFromDb = await Type.findAll({
      where: {
        name: {
          [Op.in]: req.body.types,
        },
      },
    });
    //Then add em with the setter, as the types are another entity and we need the normalization.
    await newPokemon.addTypes(typesFromDb);
    res.status(201).send({
      successMsg: "Pokemon successfully added to DB.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errorMsg: error });
  }
};

//L8r
const putPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedPokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
    });
    await updatedPokemon.update({
      name: req.body.name,
      height: req.body.height,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
      weight: req.body.weight,
      img: req.body.img,
    });
    let typesFromDb = await Type.findAll({
      where: {
        name: {
          [Op.in]: req.body.types,
        },
      },
    });
    await updatedPokemon.setTypes(typesFromDb);
    res.send(updatedPokemon);
  } catch (error) {
    res.status(400).send(error);
  }
};

//L8r
const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonToDelete = await Pokemon.findByPk(id);
    if (pokemonToDelete) {
      await pokemonToDelete.destroy();
      return res.send("Pokemon deleted!");
    }
    res.status(404).send("Pokemon not found.");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  postPokemon,
  getPokemon,
  getSinglePokemon,
  putPokemon,
  deletePokemon,
};
