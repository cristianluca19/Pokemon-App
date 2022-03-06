import Classes from "./PokemonDetail.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { getSinglePokemon, deletePokemon } from "../../actions/actions";
import PokemonDetailCard from "./pokemonDetailCard/PokemonDetailCard";

const PokemonDetail = () => {
  const [image, setImage] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const singlePokemon = useSelector((state) => state.pokemonCopy);
  useEffect(() => {
    dispatch(getSinglePokemon(id));
  }, [dispatch, id]);

  const handleImage = (e) => {
    setImage((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deletePokemon(id));
    navigate("/home");
  };
  return (
    <div>
      <div className={Classes.button}>
        {typeof singlePokemon.id === "string" && (
          <button onClick={handleDelete} className={Classes.delete}>
            DELETE POKEMON
          </button>
        )}
        <NavLink to="/home">
          <button className={Classes.backHome}>BACK TO HOME</button>
        </NavLink>
        {typeof singlePokemon.id === "string" && (
          <NavLink to={`/updatePokemon/${id}`}>
            <button className={Classes.update}>UPDATE POKEMON</button>
          </NavLink>
        )}
      </div>
      <div className={Classes.container}>
        <main className={Classes.pokemonImg}>
          <div>{singlePokemon.name && singlePokemon.name.toUpperCase()}</div>
          <div>
            <img
              alt="pokemon"
              onClick={handleImage}
              src={image ? singlePokemon.img : singlePokemon.backImg}
            />
          </div>
        </main>
        <PokemonDetailCard stats={singlePokemon} />
      </div>
    </div>
  );
};

export default PokemonDetail;
