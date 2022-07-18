import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../Redux-actions/index";
import s from '../Style/home.module.css'

const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput(e.target.value);
    
  };
  const onClickHandler = (e) => {
    dispatch(getName(input));
    setInput('')
  };



  return (
    <div key="search1" className={s.search}>
      <input 
        className={s.input}
        type="text"
        placeholder="Search by name"
        name="input"
        value={input}
        onChange={(e) => inputHandler(e)}
      />
     
        <button className={s.boton} onClick={(e) => onClickHandler(e)}>
          Search
        </button>
    
      
    </div>
  );
};

export default SearchBar;