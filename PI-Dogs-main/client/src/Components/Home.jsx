import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  filterByTemp,
  filterCreated,
  orderName,
  orderByWeight,
} from "../Redux-actions";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Dog from "./Dog";
import s from "../Style/home.module.css";

const Home = () => {
  const dispatch = useDispatch(); //con esta hook puedo despachar acciones
  const allDogs = useSelector((state) => state.dogs); //aca selecciono mi estado en el reducer
  const temperaments = useSelector((state) => state.temperaments);
  const [order, setOrder] = useState(""); //utilizo este estado local para dar cambio al estado del componente cuando hago una accion de ordenamiento

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  //-----------PAGINADO
  const [currentPage, setCurrentPage] = useState(1);//estado para la pagina actual  de el paginado, inicialmente es uno pero va cambiando en la funcion paginado
  const [dogsPerPage] = useState(8);//estado que fija la cantidad de 
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);//esta funcion recibe un numero del componente "Paginado" que surge de un recorrido for que agrega un numero agrega un numeros
    // con su valor incrementado en uno a un arreglo, comenzando desde el uno hasta llegar al numero que surge de dividir la cantidad de objetos que existen 
    //en mi estado de perros por la cantidad requerida en el estado de "dogPerPage", en este caso es 8.
  };
  const changePageNext=()=>{
      setCurrentPage((page)=> page + 1);
  }
  const changePagePrev=()=>{
      setCurrentPage((page)=> page - 1 );
  }
  
  
  //----funciones de manejos de cambios---

  //---filtros
  function handleFilterTemp(e) {
    e.preventDefault();
    dispatch(filterByTemp(e.target.value));
    setCurrentPage(1)
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1)
  
  }

  //---ordenamientos

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1)
  
    
  }

  function handleOrderWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1)
  
  }

  function handleClick(e) {
    //funcion para manejar el boton reload
    e.preventDefault();
    dispatch(getDogs());
  }
  return (
    <div key="home">
      <nav className={s.nav} key="nav">
        <div className={s.divbot}>
          <li className={s.li}>
            <button className={s.botonlink}>
              <Link to="/create" className={s.link}>
                Create Dog
              </Link>
            </button>
          </li>

          <li className={s.li}>
            <button className={s.boton} onClick={handleClick} key="reload">
              Reload
            </button>
          </li>
        </div>
        <SearchBar />

        <li className={s.li}>
          <select
            className={s.input}
            key="orders1"
            onChange={(e) => handleOrderName(e)}
          >
            <option disabled selected>
              Order by Name
            </option>
            <option key="o1" value="a-z">
              A-Z
            </option>
            <option key="o2" value="z-a">
              Z-A
            </option>
          </select>
        </li>
        <li className={s.li}>
          <select
            className={s.input}
            key="orders2"
            onChange={(e) => handleOrderWeight(e)}
          >
            <option disabled selected>
              Order by Weigth
            </option>
            <option key="o3" value="lower">
              Lower weight
            </option>
            <option key="o4" value="higer">
              Higer weight
            </option>
          </select>
        </li>
        <li className={s.li}>
          <select
            key="temper"
            onChange={(e) => handleFilterTemp(e)}
            className={s.input}
          >
            <option disabled selected>
              Filter by Temperament
            </option>
            {temperaments?.map((temp) => {
              return (
                <option key={temp.id} value={temp.name}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </li>
        <li className={s.li}>
          <select
            className={s.input}
            key="created"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option disabled selected>
              Filter by created
            </option>
            <option key="fil1" value="created">
              Dogs created
            </option>
            <option key="fil2" value="api">
              Existing dogs
            </option>
          </select>
        </li>
        <li className={s.li}></li>
      </nav>
      <div key="pag1" className={s.divpag}>
        <Paginado
          DogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage={currentPage}
          changePagePrev={changePagePrev}
          changePageNext={changePageNext}
          
        />
      </div>
      <div className={s.main} key="main">
        {currentDogs?.map((e) => {
          return(
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

      <div key="pag2" className={s.divpag}>
        <Paginado
          DogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage={currentPage}
          
        />
      </div>
    </div>
  );
};

export default Home;

// __Ruta principal__: debe contener

// - [V ] Input de búsqueda para encontrar razas de perros por nombre
// - [ v] Área donde se verá el listado de razas de perros. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Temperamento
//   - Peso
// - [ V] Botones/Opciones para filtrar por:
//   - Temperamento
//   - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
// - [ V] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
//   - Orden alfabético
//   - Peso
// - [v ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.
