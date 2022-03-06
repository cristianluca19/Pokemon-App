import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landingpage/LandingPage";
import PokemonCreateForm from "./components/pokemoncreateform/PokemonCreateForm";
import PokemonDetail from "./components/pokemondetail/PokemonDetail";
import About from "./components/about/About";
import NotFound from "./components/not found/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createPokemon" element={<PokemonCreateForm />} />
          <Route path="/home/:id" element={<PokemonDetail />} />
          <Route path="/updatePokemon/:id" element={<PokemonCreateForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
