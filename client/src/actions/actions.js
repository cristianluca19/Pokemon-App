import axios from "axios";

export const getPokemon = () => {
  return async function (dispatch) {
    const pokemon = await axios.get("/pokemons");
    return dispatch({
      type: "GET_POKEMON",
      payload: pokemon.data,
    });
  };
};

export const getSinglePokemon = (id) => {
  return async function (dispatch) {
    const singlePokemon = await axios.get(
      `/pokemons/${id}`
    );
    return dispatch({
      type: "GET_SINGLE_POKEMON",
      payload: singlePokemon.data,
    });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const types = await axios.get("/types");
    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
};

export const postPokemon = (data) => {
  return async function (dispatch) {
    await axios.post("/pokemons", data);
    return dispatch({
      type: "ADD_POKEMON",
    });
  };
};

export const updatePokemon = (id, data) => {
  return async function (dispatch) {
    await axios.put(`/pokemons/${id}`, data);
    return dispatch({
      type: "UPDATE_POKEMON",
    });
  };
};

export const deletePokemon = (id) => {
  return async function (dispatch) {
    await axios.delete(`/pokemons/${id}`);
    return dispatch({
      type: "DELETE_POKEMON",
    });
  };
};

export const sortPokemon = (sortCriteria) => {
  return {
    type: "SORT_POKEMON",
    payload: sortCriteria,
  };
};

export const filterPokemon = (filterCriteria) => {
  return {
    type: "FILTER_POKEMON",
    payload: filterCriteria,
  };
};

export const filterByTypes = (type, origin) => {
  return {
    type: "FILTER_BY_TYPE",
    payload: { type, origin },
  };
};

export const searchPokemon = (name) => {
  return {
    type: "SEARCH_POKEMON",
    payload: name,
  };
};
