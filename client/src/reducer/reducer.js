import {
  sortPokemon,
  filterPokemon,
  searchPokemon,
  filterByType,
} from "./utils";

const initialState = {
  pokemon: [],
  pokemonCopy: [],
  apiPokemon: [],
  createdPokemon: [],
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
        pokemonCopy: action.payload,
        apiPokemon: filterPokemon("Existing", action.payload),
        createdPokemon: filterPokemon("Created", action.payload),
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_SINGLE_POKEMON":
      return {
        ...state,
        pokemonCopy: action.payload,
      };
    case "ADD_POKEMON":
      return {
        ...state,
      };
    case "UPDATE_POKEMON":
      return {
        ...state,
      };
    case "DELETE_POKEMON":
      return {
        ...state,
      };
    case "SORT_POKEMON":
      return {
        ...state,
        pokemonCopy: sortPokemon(action.payload, state.pokemonCopy),
      };
    case "FILTER_POKEMON":
      return {
        ...state,
        pokemonCopy: filterPokemon(action.payload, state.pokemon),
      };
    case "FILTER_BY_TYPE":
      return {
        ...state,
        pokemonCopy: filterByType(
          action.payload["type"],
          action.payload["origin"] === "Existing"
            ? state.apiPokemon
            : action.payload["origin"] === "Created"
            ? state.createdPokemon
            : state.pokemon
        ),
      };
    case "SEARCH_POKEMON":
      return {
        ...state,
        pokemonCopy: searchPokemon(action.payload, state.pokemon),
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
