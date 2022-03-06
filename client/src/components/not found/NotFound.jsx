import React from "react";
import Classes from "./NotFound.module.css";
import Psyduck from "../../img/psyduck.gif";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={Classes.container}>
      <div className={Classes.textContainer}>
        <h1>ERROR 404 (NOT FOUND)</h1>
        <h2>
          Oops! <br /> Seems like you got lost! <br /> Don't worry, let's get
          back home.
        </h2>
        <NavLink to="/home">
          <button className={Classes.button}>GO BACK HOME</button>
        </NavLink>
      </div>
      <div>
        <img alt="Lost Psyduck" src={Psyduck} />
      </div>
    </div>
  );
};

export default NotFound;
