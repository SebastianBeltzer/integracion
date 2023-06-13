import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
//! IMPORTAR CSS {IMP "STYLE" FROM "./CARD.MODULE.CSS"}
import style from "./Card.module.css";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../../redux/actions";

//Diseñaremos las cartas y en Cards modificaremos su posicion.
function Card(props) {
  const navigate = useNavigate();
  const { character, onClose, addFavorite, removeFavorite, favorites } = props;
  const { id } = character;

  const [closeBtn, setCloseBtn] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, [onClose]);

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setFav(true);
      }
    });
  }, [favorites, id]);

  function navigateHandler() {
    navigate(`/detalles/${character.id}`);
  }

  function handleFavorite(character) {
    if (!fav) {
      addFavorite(character);
      setFav(true);
    } else {
      removeFavorite(character);
      setFav(false);
    }
  }

  return (
    <div className={style.card}>
      <img
        className={style.cardimage}
        src={character.image}
        alt={character.name}
        onClick={navigateHandler}
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
      {fav ? (
        <button
          className={style.fav}
          onClick={() => handleFavorite(character.id)}
        >
          ❤️
        </button>
      ) : (
        <button className={style.fav} onClick={() => handleFavorite(character)}>
          🤍
        </button>
      )}

      {closeBtn && (
        <button
          className={style.cardbutton}
          onClick={() => {
            onClose(character.id);
          }}
        >
          DELETE
        </button>
      )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => dispatch(addFavorite(character)),

    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    favorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

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
