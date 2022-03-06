import Classes from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={Classes.main}>
      <div className={Classes.left}>
        <div className={Classes.topdiv}>
          <h1>Let's find your pokemon.</h1>
          <NavLink to="/home">
            <button className={Classes.button}> Open Pokédex</button>
          </NavLink>
        </div>
        <div className={Classes["mini-footer"]}>
          <p>
            This little app was created by Axel Lois, for educational purposes.
          </p>
        </div>
      </div>
      <div className={Classes.right}>
        <h1>Hi! Welcome to my Pokédex</h1>
        <img
          className={Classes.img}
          alt="Pikachu"
          src="https://www.pngmart.com/files/2/Pikachu-Transparent-Background.png"
        ></img>
      </div>
    </div>
  );
};

export default LandingPage;
