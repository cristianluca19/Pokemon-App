import React, { Fragment } from "react";
import Classes from "./Pagination.module.css";
// import { NavLink } from "react-router-dom";

const Pagination = ({ pokemonPerPage, pokemonQuantity, onSetPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(pokemonQuantity / pokemonPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    for (let page of pages) {
      if (page === parseInt(e.target.value)) {
        document.getElementById(page).classList.add(Classes.btn__active);
      } else {
        document.getElementById(page).classList.remove(Classes.btn__active);
      }
    }
    onSetPage(e.target.value);
  };

  return (
    <Fragment>
      {pages &&
        pages.map((page) => {
          return (
            <button
              id={page}
              value={page}
              className={Classes.btn}
              key={page}
              onClick={handleClick}
            >
              {page}
            </button>
          );
        })}
    </Fragment>
  );
};

export default Pagination;
