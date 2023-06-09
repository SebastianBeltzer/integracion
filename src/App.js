import "./App.css";
import { Route, Routes, rou, useLocation, useNavigate } from "react-router-dom";
import Cards from "./components/Cards/Cards.jsx";
import NavBar from "./components/NavBar/NavBar";
//! anterior importe donde se encontraban los personajes
// import characters from "./data.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

import About from "./Views/abaut/abaut";
import Detalles from "./Views/detalles/detalles";
import Error from "./Views/error/error";
import LoguinForms from "./Views/user/loguinForms";

function App() {
  const [characters, setCharacters] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const [access, setAccess] = useState(false);
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
  }, [access]);

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
  /*
  ! funcion que explico gama para recorrer una api sin axios
  fetch(https://rickandmortyapi.com/api/character/${id})
  .then((res) => res.json())
  .then((data) => setCharacters([...prevCharacters, data]);)
  
  */

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
  //
  function closeHandler(id) {
    let deleted = characters.filter((character) => character.id !== Number(id));
    setCharacters(deleted);
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
        <Route
          path="/detalles/:id"
          element={<Detalles characters={characters} onClose={closeHandler} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
