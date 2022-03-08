import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemon,
  getTypes,
  sortPokemon,
  filterPokemon,
  searchPokemon,
  filterByTypes,
} from "../../actions/actions";
import Loader from "../../img/loader.gif";
import Navbar from "./nav/Navbar";
import Pagination from "./pagination/Pagination";
import Classes from "./Home.module.css";
import Card from "../UI/Card";
import Pokeball from "../../img/pokebola.png";
import Cubone from "../../img/cubone.png";

const Home = () => {
  const [, /*refreshState*/ setRefreshState] = useState(false);
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonCopy);
  const types = useSelector((state) => state.types);
  const [origin, setOrigin] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [pokemonPerPage /*setPokemonPerPage*/] = useState(12);
  const lastPokemonIndex = currentPage * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const currentPokemon =
    pokemon.length > 0 && pokemon.slice(firstPokemonIndex, lastPokemonIndex);

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());
  }, [dispatch]);

  const handleSort = (e) => {
    dispatch(sortPokemon(e.target.value));
    setRefreshState((prevState) => !prevState);
  };

  const handleFilterByType = (e) => {
    dispatch(filterByTypes(e.target.value, origin));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  };

  const pageHandler = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    setOrigin(e.target.value);
    dispatch(filterPokemon(e.target.value));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  };

  const handleSearch = (value) => {
    dispatch(searchPokemon(value));
    setCurrentPage(1);
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (currentPokemon && loader) {
    setLoader(false);
  }

  return (
    <Fragment>
      <Navbar onSearch={handleSearch} />
      <main className={Classes.mainFlex}>
        <div className={Classes.filters}>
          <div className={Classes.selects}>
            <select
              onChange={handleSort}
              className={Classes.select}
              name="Type"
            >
              <option value="Sort by name" selected disabled>
                Sort by name
              </option>
              <option value="AscendingName">Ascending</option>
              <option value="DescendingName">Descending</option>
            </select>
            <select
              onChange={handleSort}
              className={Classes.select}
              name="Type"
            >
              <option value="Sort by attack" selected disabled>
                Sort by attack
              </option>
              <option value="AscendingAttack">Ascending</option>
              <option value="DescendingAttack">Descending</option>
            </select>
            <select
              onChange={handleFilterByType}
              className={Classes.select}
              name="Type"
            >
              <option value="Filter by type" selected disabled>
                Sort by type
              </option>
              {types &&
                types.map((type) => {
                  return (
                    <option key={type.name} value={type.name}>
                      {type.name}
                    </option>
                  );
                })}
            </select>
            <select
              onChange={handleFilter}
              className={Classes.select}
              name="Origin"
            >
              <option value="Filter by origin" selected disabled>
                Filter by origin
              </option>
              <option value="All">All</option>
              <option value="Existing">Existing</option>
              <option value="Created">Created</option>
            </select>
          </div>
          <div className={Classes.pagination}>
            <Pagination
              pokemonPerPage={pokemonPerPage}
              pokemonQuantity={pokemon.length}
              onSetPage={pageHandler}
            />
          </div>
          <button onClick={handleReload} className={Classes.refreshButton}>
            <img alt="Reload" src={Pokeball} />
          </button>
        </div>
        <section className={Classes.sectionFlex}>
          {currentPokemon.length > 0 && !loader ? (
            currentPokemon.map((poke) => {
              return (
                <Card
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  img={poke.img}
                  types={poke.types}
                />
              );
            })
          ) : !currentPokemon && loader ? (
            <img alt="loader" className={Classes.loader} src={Loader} />
          ) : (
            <div className={Classes.notFound}>
              <h1>There are no existing pokemon for that criteria.</h1>
              <img src={Cubone} />
            </div>
          )}
        </section>
      </main>
    </Fragment>
  );
};

export default Home;
