import React from "react";
import Pokeball from "../../../img/pokebola.png";
import Classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearchValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };
  return (
    <nav className={Classes.navbar}>
      <div className={Classes.left_navbar}>
        <img className={Classes.img} alt="Pokeball" src={Pokeball}></img>
        <p>Pokédex</p>
      </div>
      <div className={Classes.middle_navbar}>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleSearchValue}
            value={value}
            type="search"
            placeholder="Search your pokémon..."
          />
          <button type="submit">
            <img
              className={Classes.imgSearch}
              src={Pokeball}
              alt="Pokeball button"
            />
          </button>
        </form>
      </div>

      <div className={Classes.right_navbar}>
        <NavLink to='/about'>
          <button>ABOUT ME </button>
        </NavLink>
        <NavLink to="/createPokemon">
          <button>ADD POKÉMON </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
