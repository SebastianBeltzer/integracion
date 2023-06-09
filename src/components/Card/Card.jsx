import { useNavigate } from "react-router-dom";

//! IMPORTAR CSS {IMP "STYLE" FROM "./CARD.MODULE.CSS"}
import style from "./Card.module.css";
import { useEffect, useState } from "react";

//Diseñaremos las cartas y en Cards modificaremos su posicion.
function Card(props) {
  const { character, onClose, addFavorito, removeFavorito, favorites } = props;

  //   character = {
  //     id: 1,
  //     name: "Rick Sanchez",
  //     species: "Human",
  //     gender: "Male",
  //     image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  //   };

  return (
    <div className={style.card}>
      <img
        className={style.cardimage}
        src={character.image}
        alt={character.name}
        onClick={naviguetHandlers}
      />
      <div className={style.category}>
        <h2>Name: {character.name}</h2>
      </div>
      <div className={style.heading}>
        <p>
          Species: {character.species} <br />
          Gender: {character.gender}
        </p>
      </div>
      <button
        className={style.cardbutton}
        onClick={() => {
          onClose(character.id);
        }}
      >
        DELETE
      </button>

      {fav ? (
        <button onClick={() => handleFavorite(character.id)}>❤️</button>
      ) : (
        <button onClick={() => handleFavorite(character)}>🤍</button>
      )}
    </div>
  );
}

export default Card;

/*
<button
            className={style.botonesAdd}
            onClick={() => {
               randomizer();
            }}
         >
            <img src="https://i.ibb.co/YbHTQXV/Randomizer.png" alt="" />
         </button>

const randomizer = () => {
      const randomId = (Math.floor(Math.random() * 826) + 1).toString();
      setId(randomId);
      onSearch(randomId);
      setId("");
   };
   box-shadow: 8px 12px 30px 1px # 000;
https://webcode.tools/generators/css/box-shadow
*/
