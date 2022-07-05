import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments } from "../Redux-actions";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Dog from "./Dog";

const Home = () => {
  const dispatch = useDispatch(); // despacha aciones medante hooks
  const allDogs = useSelector((state) => state.dogs); 
  const temperaments = useSelector((state) => state.temperaments);

  //-----------PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  function handleClick(e) {
    //funcion para manejar el dispach en el boton reload
    e.preventDefault();
    dispatch(getDogs());
  }
  return (
    <div>
      <Link to="/create">Create Dog</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all countries
      </button>
      <div>
        <SearchBar />
        <select>
          <option value="asc">ascendente</option>
          <option value="des">descendente</option>
        </select>
        <select name="temperfilter">
            {temperaments.map(temp=>{
                return(
                    <option value={temp.name}>{temp.name}</option>
                )
            })

            }
        </select>
      </div>
      <Paginado
        DogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      {currentDogs?.map((e) => {
        return (
          <Dog
            id={e.id}
            name={e.name}
            weight_min={e.weight_min}
            weight_max={e.weight_max}
            image={e.image}
            temperament={e.temperament}
          />
        );
      })}
      
    </div>
  );
};

export default Home;
