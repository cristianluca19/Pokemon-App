import React from "react";
import Classes from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, img, types, id }) => {
  return (
    <div className={Classes.container}>
      <div className={Classes.top}>
        <h3>{name && name.toUpperCase()}</h3>
      </div>
      <div className={Classes.rest}>
        <Link to={`/home/${id}`}>
          <div className={Classes.img}>
            <img src={img} alt="Pokemon" />
          </div>
        </Link>
        <div className={Classes.types}>
          {types.map((type) => {
            return (
              <div key={type} className={Classes.type}>
                <img
                  alt="Type"
                  src={require(`./pokeIcons/${type}.png`).default}
                />
                <p>{type && type.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
