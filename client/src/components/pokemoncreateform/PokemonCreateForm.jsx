import Classes from "./PokemonCreateForm.module.css";
import { useEffect, useState } from "react";
import {
  getTypes,
  postPokemon,
  getSinglePokemon,
  updatePokemon,
} from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import Cross from "../../img/cross.png";
import { validateForm } from "./validate";

const PokemonCreateForm = () => {
  const dispatch = useDispatch();
  //In case we are updating one.
  const { id } = useParams();
  const pokemonToUpdate = useSelector((state) => state.pokemonCopy);
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [updated, setUpdated] = useState(false);
  //to set the types on the div, for better UX
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    img: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
    id && dispatch(getSinglePokemon(id));
  }, [dispatch, id]);

  const handleImgClick = (e) => {
    if (!selectedTypes.includes(e.target.name) && selectedTypes.length < 2) {
      selectedTypes.push(e.target.name);
    }
    setSelectedTypes(selectedTypes);
    setFormState({ ...formState, types: selectedTypes });
    setErrors(validateForm({ ...formState, types: selectedTypes }));
  };

  const handleDelete = () => {
    selectedTypes.pop();
    setSelectedTypes(selectedTypes);
    setFormState({
      ...formState,
      types: selectedTypes,
    });
    setErrors(validateForm({ ...formState, types: selectedTypes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let createdOrUpdatedPokemon = formState;
    createdOrUpdatedPokemon = {
      ...formState,
      hp: parseInt(createdOrUpdatedPokemon.hp),
      attack: parseInt(createdOrUpdatedPokemon.attack),
      defense: parseInt(createdOrUpdatedPokemon.defense),
      speed: parseInt(createdOrUpdatedPokemon.speed),
      weight: parseInt(createdOrUpdatedPokemon.weight),
      height: parseInt(createdOrUpdatedPokemon.height),
    };
    setErrors(validateForm(createdOrUpdatedPokemon));
    //hp is a scapegoat as well
    if (!Object.keys(errors).length && createdOrUpdatedPokemon.hp) {
      if (!id) {
        dispatch(postPokemon(createdOrUpdatedPokemon));
      } else {
        dispatch(updatePokemon(id, createdOrUpdatedPokemon));
      }
      setFormState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        img: "",
        types: [],
      });
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...formState,
        [e.target.name]: e.target.value,
      })
    );
  };

  //name is like a scapegoat, as if i put only pokemonToUpdate it goes in when it is an []
  //Here i put the values of the created pokemon on the inputs.
  if (id && pokemonToUpdate.name && !updated) {
    setSelectedTypes(pokemonToUpdate.types);
    setFormState({
      ...formState,
      name: pokemonToUpdate.name,
      hp: pokemonToUpdate.hp,
      attack: pokemonToUpdate.attack,
      defense: pokemonToUpdate.defense,
      speed: pokemonToUpdate.speed,
      weight: pokemonToUpdate.weight,
      height: pokemonToUpdate.height,
      img: pokemonToUpdate.img,
      types: pokemonToUpdate.types,
    });
    setUpdated(!updated);
  }

  return (
    <div className={Classes.container}>
      <NavLink to="/home">
        <button className={Classes.topButton}>BACK TO HOME</button>
      </NavLink>
      <form onSubmit={handleSubmit} className={Classes.form}>
        <label>
          Name
          <input
            className={errors.name && Classes.error}
            onChange={handleChange}
            value={formState.name}
            name="name"
            type="text"
            placeholder="Insert name..."
          />
        </label>
        <label>
          Hp
          <input
            className={errors.hp && Classes.error}
            onChange={handleChange}
            value={formState.hp}
            name="hp"
            type="number"
            min="1"
            placeholder="Insert HP..."
          />
        </label>
        <label>
          Attack
          <input
            className={errors.attack && Classes.error}
            onChange={handleChange}
            value={formState.attack}
            name="attack"
            type="number"
            min="1"
            placeholder="Insert Attack..."
          />
        </label>
        <label>
          Defense
          <input
            className={errors.defense && Classes.error}
            onChange={handleChange}
            value={formState.defense}
            name="defense"
            type="number"
            min="1"
            placeholder="Insert Defense..."
          />
        </label>
        <label>
          Speed
          <input
            className={errors.speed && Classes.error}
            onChange={handleChange}
            value={formState.speed}
            name="speed"
            type="number"
            min="1"
            placeholder="Insert Speed..."
          />
        </label>
        <label>
          Weight
          <input
            className={errors.weight && Classes.error}
            onChange={handleChange}
            value={formState.weight}
            name="weight"
            type="number"
            min="1"
            placeholder="Insert Weight (kg)"
          />
        </label>
        <label>
          Height
          <input
            className={errors.height && Classes.error}
            onChange={handleChange}
            value={formState.height}
            name="height"
            type="number"
            min="1"
            placeholder="Insert Weight (cm)"
          />
        </label>
        <label>
          Image
          <input
            className={errors.img && Classes.error}
            onChange={handleChange}
            value={formState.img}
            name="img"
            type="url"
            placeholder="Insert photo url..."
          />
        </label>
        Types
        <div
          name="types"
          className={errors.types ? Classes.typesWithError : Classes.types}
        >
          {selectedTypes &&
            selectedTypes.map((type) => {
              return <p key={type}>{type}</p>;
            })}
          {selectedTypes.length > 0 && (
            <img
              alt="deleteIcon"
              onClick={handleDelete}
              className={Classes.cross}
              width="40px"
              src={Cross}
            />
          )}
        </div>
        <div className={Classes.icons}>
          {types &&
            types.map((type) => {
              return (
                <div key={type.name}>
                  <img
                    alt="TypeIcon"
                    onClick={handleImgClick}
                    name={type.name}
                    src={require(`../UI/pokeIcons/${type.name}.png`).default}
                  />
                </div>
              );
            })}
        </div>
        <button type="submit">
          {id ? "Update Pokémon" : "Create Pokémon"}
        </button>
      </form>
      <div className={Classes.errorDiv}>
        <h3>Errors:</h3>
        <p className={Classes.required}>- Field required</p>
      </div>
    </div>
  );
};

export default PokemonCreateForm;
