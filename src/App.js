import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cards from "./components/cards/Cards";
import NavBar from "./components/NavBar/NavBar";
//! anterior importe donde se encontraban los personajes
// import characters from "./data.js";
import { useState, useEffect } from "react";
import axios from "axios";

import About from "./Views/abaut/abaut";
import Detalles from "./Views/detalles/detalles";

import Error from "./Views/error/error";
import LoguinForms from "./Views/user/loguinForms";
import Favorties from "./Views/fav/favorties";
import { useDispatch } from "react-redux";
import { removeFavorite } from "./redux/actions";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const EMAIL = "seba@gmail.com";
  const PASSWORD = "4Password";

  function login(userData) {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  function onSearch(id) {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
  }

  function closeHandler(id) {
    let deleted = characters.filter((character) => character.id !== Number(id));

    dispatch(removeFavorite(id));

    setCharacters(deleted);
  }

  function randomHandler() {
    let haveIt = [];
    //Generate random number
    let random = (Math.random() * 826).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      fetch(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("No hay personajes con ese ID");
          }
        });
    } else {
      console.log("Ya agregaste todos los personajes");
      return false;
    }
  }

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar onSearch={onSearch} random={randomHandler} />
      )}

      <Routes>
        <Route path="/" element={<LoguinForms login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorties />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
