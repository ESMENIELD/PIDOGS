import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../Redux-actions/index";

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
    <div >
      <input
      
        type="text"
        placeholder="Search by name"
        name="input"
        value={input}
        autocomplete="off"
        onChange={(e) => inputHandler(e)}
      />
      <div>
        <button  onClick={(e) => onClickHandler(e)}>
          Search
        </button>
    
      </div>
    </div>
  );
};

export default SearchBar;