import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {  getTemperaments } from "../Redux-actions";

function FormDog() {
  //--------- estados globales y locales
  const allTemperaments = useSelector((state) => state.temperaments); //---traigo los estados globales.
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(getTemperaments());
  }, [dispatch]);

  //----ESTADOS LOCALES

  

  const [dataForm, setDataForm] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    life_time_min: "",
    life_time_max: "",
    temperament: [],
  });

  //----funciones para recopilar los datos

  function handlerDataForm(e) {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  }

  function handlertemperament(e) {
    
    setDataForm({
        ...dataForm,
      temperament: [...dataForm.temperament, e.target.value],

    });
    

  }

  function RemoveTemperament(name) {
   setDataForm({
    ...dataForm,
    temperament: dataForm.temperament.filter(e=> e !== name)

   })

    
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    


  console.log(dataForm)
    await axios.post("http://localhost:3001/dogs", dataForm);


    alert("Dog created");

    

    setDataForm({
      name: "",
      weight_min: "",
      weight_max: "",
      height_min: "",
      height_max: "",
      life_time_min: "",
      life_time_max: "",
      temperament:[]
    });
  };

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Dog's name:</label>
          <input
            type="text"
            id="name1"
            onChange={handlerDataForm}
            name="name"
            value={dataForm.name}
            required
          />
        </div>
        <div>
          <label>Minimum weight:</label>
          <input
            type="number"
            id="peso_min"
            onChange={handlerDataForm}
            name="weight_min"
            value={dataForm.weight_min}
            required
          />
        </div>
        <div>
          <label>Maximun weight:</label>
          <input
            type="number"
            id="peso_max"
            onChange={handlerDataForm}
            name="weight_max"
            value={dataForm.weight_max}
            required
          />
        </div>
        <div>
          <label>Minimum height:</label>
          <input
            type="number"
            id="altura_min"
            onChange={handlerDataForm}
            name="height_min"
            value={dataForm.height_min}
            required
          />
        </div>
        <div>
          <label>Maximum height:</label>
          <input
            type="number"
            id="altura_max"
            onChange={handlerDataForm}
            name="height_max"
            value={dataForm.height_max}
            required
          />
        </div>
        <div>
          <label>Minimum life spect:</label>
          <input
            type="number"
            id="lifemin1"
            name="life_time_min"
            onChange={handlerDataForm}
            value={dataForm.life_time_min}
            required
          />
        </div>
        <div>
          <label>Maximum life spect:</label>
          <input
            type="number"
            id="lifemax1"
            onChange={handlerDataForm}
            name="life_time_max"
            value= {dataForm.life_time_max}
            required
          />
        </div>
        <div>
          <label>select Temperament:</label>
          <select
            name="temperament"
            id="temper1"
            onChange={handlertemperament}
          >
            {allTemperaments?.map((e) => (
              <option value={e.name} key={e.id}>{e.name}</option>
            ))}
          </select>
          {dataForm.temperament?.map((temp) => (
          <p key={temp}>
            
            {temp}
            <button onClick={() => RemoveTemperament(temp)}>X</button>
          </p>
        ))}
        </div>
        <button type="submit">Create</button>
       
      </form>
    </div>
  );
}

export default FormDog;

// __Ruta de creación de raza de perro__: debe contener

// - [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
//   - Nombre
//   - Altura (Diferenciar entre altura mínima y máxima)
//   - Peso (Diferenciar entre peso mínimo y máximo)
//   - Años de vida
// - [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// - [ ] Botón/Opción para crear una nueva raza de perro
