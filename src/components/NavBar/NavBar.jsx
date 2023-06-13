import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar({ onSearch, random }) {
  return (
    <nav className={style.navBar}>
      <div className={style.link}>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className={style.link2}>
        <NavLink to="/home">inicio</NavLink>
      </div>
      <div className={style.link2}>
        <NavLink to="/favorites">Favs</NavLink>
      </div>

      <SearchBar onSearch={onSearch} />
      <button className={style.btn} onClick={random}>
        add random
      </button>
    </nav>
  );
}
