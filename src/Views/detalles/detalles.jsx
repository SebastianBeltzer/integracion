import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./detalles.module.css";

export default function Detalles(props) {
  const { id } = useParams();
  const [character, setCharacter] = useState([]);
  const naviguet = useNavigate();
  const { characters, onClose } = props;

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);
  function naviguetHandlersNext() {
    naviguet(`/Detalles/${character.id + 1}`);
  }
  function naviguetHandlersPrev() {
    if (character.id > 1) {
      naviguet(`/Detalles/${character.id - 1}`);
    }
  }
  return (
    <div>
      <div className={style.contenedor}>
        <div className={style.card2}>
          <div className={style.imgconteiner}>
            <img
              className={style.cardimage}
              src={character.image}
              alt={character.name}
            />
          </div>
        </div>
        <div className={style.card}>
          <div className={style.textconteiner}>
            <div className={style.category}>
              <h2>Name: {character.name}</h2>
            </div>
            <div className={style.heading}>
              <p>
                {`Especie: ${character.species}.
                 Genero: ${character.gender}.
                 Origen: ${character.origin?.name}.
                 Localidad: ${character.location?.name}`}
              </p>
            </div>
            <div className={style.divBtn}>
              <button className={style.btn2} onClick={naviguetHandlersPrev}>
                Personaje anterior
              </button>
              <button className={style.btn2} onClick={naviguetHandlersNext}>
                Personaje siguiente
              </button>
            </div>
          </div>
          <button
            className={style.cardbutton}
            onClick={() => {
              onClose(character.id);
            }}
          >
            {`Estado: ${character.status}`}
          </button>
        </div>
      </div>
    </div>
  );
}

/*



import { useNavigate } from "react-router-dom";

const naviguet = useNavigate();
function naviguetHandlers() {
    naviguet(`/Detalles/${character.id}`);
  }
  status={Rick.status}
        species={Rick.species}
        gender={Rick.gender}
        origin={Rick.origin.name}









        <div className={style.card2}>
          <div className={style.content2}>
            <p className={style.heading2}>
              Informacion sobre: {character.name}
            </p>
            <p className={style.para}>
              {`Especie: ${character.species},
               Genero: ${character.gender}, 
               Estado: ${character.status}, 
               origen: ${character.origin?.name}, 
               Localidad: ${character.location?.name}`}
            </p>
            <div className={style.divBtn}>
              <button className={style.btn2} onClick={naviguetHandlersPrev}>
                Personaje anterior
              </button>
              <button className={style.btn2} onClick={naviguetHandlersNext}>
                Personaje siguiente
              </button>
            </div>
          </div>
 */
