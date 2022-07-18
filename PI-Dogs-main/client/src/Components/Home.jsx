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
  const dispatch = useDispatch(); // despacha aciones medante hooks
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [order, setOrder] = useState("");

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
  }, [dispatch]);

  //----funciones de manejos de cambios---

  //---filtros
  function handleFilterTemp(e) {
    e.preventDefault();
    dispatch(filterByTemp(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  //---ordenamientos

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setOrder(`Ordenado ${e.target.value} `);
  }

  function handleOrderWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Ordenado ${e.target.value} `);
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
          <Link  to="/create" className={s.link}>Create Dog</Link>
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
        <li className={s.li}>
          
        </li>

        
          <Paginado
            DogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            currentPage= {currentPage}
          />
        
      </nav>
      <div className={s.main} key="main">
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

      <div key="pag2">
        <Paginado
          DogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage= {currentPage}
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
