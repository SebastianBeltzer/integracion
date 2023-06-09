import React, { useState } from "react";
import style from "./SearchBar.module.css";

export default function NavBar({ onSearch }) {
  const [id, setId] = useState("");

  function changeHandler(e) {
    let input = e.target.value;
    setId(input);
  }

  return (
    <div>
      <input
        className={style.inputstyle}
        placeholder="Type here..."
        type="search"
        value={id}
        onChange={changeHandler}
      />
      <button
        className={style.bttn}
        onClick={() => {
          onSearch(id);
        }}
      >
        Agregar
      </button>
    </div>
  );
}
/*
<input placeholder="Enter text here" class="input-style" type="text"> 
*/
