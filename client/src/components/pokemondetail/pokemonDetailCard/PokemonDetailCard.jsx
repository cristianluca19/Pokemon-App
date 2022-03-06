import React from "react";
import Classes from "./PokemonDetailCard.module.css";
import heart from "../../../img/heart.png";
import sword from "../../../img/sword.png";
import shield from "../../../img/shield.png";
import feather from "../../../img/feather.png";
import height from "../../../img/height.png";
import weight from "../../../img/weight.png";

const PokemonDetailCard = ({ stats }) => {
  return (
    <div className={Classes.container}>
      <h3 className={Classes.top}>POKEMON STATS</h3>
      <div className={Classes.stats}>
        <div className={Classes.stat}>
          <img alt="icon" src={heart} />
          HP: {stats.hp}
        </div>
        <div className={Classes.stat}>
          <img alt="icon" src={sword} />
          ATTACK: {stats.attack}
        </div>
        <div className={Classes.stat}>
          <img alt="icon" src={shield} />
          DEFENSE: {stats.defense}
        </div>
        <div className={Classes.stat}>
          <img alt="icon" src={feather} />
          SPEED: {stats.speed}
        </div>

        <div className={Classes.stat}>
          <img alt="icon" src={height} />
          HEIGHT: {stats.height}
        </div>
        <div className={Classes.stat}>
          <img alt="icon" src={weight} />
          WEIGHT: {stats.weight}
        </div>
      </div>
      <h3>TYPES</h3>
      <div className={Classes.types}>
        {stats.types &&
          stats.types.map((type) => {
            return (
              <div key={type}>
                <img
                  className={Classes.typeImg}
                  alt="Type"
                  src={require(`../../UI/pokeIcons/${type}.png`).default}
                />
                <p>{type && type.toUpperCase()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PokemonDetailCard;
