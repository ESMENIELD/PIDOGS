//holaa
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTemperaments, getDogs } from "../Redux-actions";
import {
  Select,
  Form,
  Label,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "../Style/formulario"; //importacion de las etiquetas con estilo.
import Input from "./Input";
import s from "../Style/formDog.module.css";
import { Link } from "react-router-dom";

const FormDog = () => {
  const allTemperaments = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.allDogs); //---traigo los estados globales.
  const dispatch = useDispatch();

  const [name, setName] = useState({ campo: "", validate: null });
  const [weight_min, setWeight_min] = useState({ campo: "", validate: null });
  const [weight_max, setWeight_max] = useState({ campo: "", validate: null });
  const [height_min, setHeight_min] = useState({ campo: "", validate: null });
  const [height_max, setHeight_max] = useState({ campo: "", validate: null });
  const [life_time_min, setLife_time_min] = useState({
    campo: "",
    validate: null,
  });
  const [life_time_max, setLife_time_max] = useState({
    campo: "",
    validate: null,
  });

  const [formulariovalidate, setFormulariovalidate] = useState(null);
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

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  const expresiones = {
    name: /^[A-Z]+[A-Za-z0-9\s]+$/g,
  };

  const validate = () => {
    if (name.campo.length > 0) {
      let dogsCreated = allDogs.filter((e) => e.userCreated);
      let namerep = dogsCreated.map((e) => e.name === name.campo);
      //console.log(namerep);
      if (namerep.includes(true)) {
        console.log(namerep);
        setName((prevState) => {
          return { ...prevState, validate: "false1" };
        });
      } else if (name[0] === false) {
        setName((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }

    if (weight_max.campo.length > 0) {
      let weight_min_number = parseInt(weight_min.campo);
      let weight_max_number = parseInt(weight_max.campo);

      if (weight_min_number > weight_max_number) {
        setWeight_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
        setWeight_min((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setWeight_min((prevState) => {
          return { ...prevState, validate: "true" };
        });
        setWeight_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }
    if (height_min.campo && height_max.campo) {
      let height_min_number = parseInt(height_min.campo);
      let height_max_number = parseInt(height_max.campo);
      if (height_min_number > height_max_number) {
        setHeight_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
        setHeight_min((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setHeight_min((prevState) => {
          return { ...prevState, validate: "true" };
        });
        setHeight_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }

    if (life_time_min.campo && life_time_max.campo) {
      let life_min_number = parseInt(life_time_min.campo);
      let life_max_number = parseInt(life_time_max.campo);

      if (life_min_number > life_max_number) {
        setLife_time_min((prevState) => {
          return { ...prevState, validate: "false" };
        });
        setLife_time_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setLife_time_min((prevState) => {
          return { ...prevState, validate: "true" };
        });
        setLife_time_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }
  };
  function handlertemperament(e) {
    e.preventDefault();
    if (dataForm.temperament.length === 3) {
      alert("only add 3 temperaments");
    } else if (dataForm.temperament.length < 3) {
      setDataForm({
        ...dataForm,
        name: name.campo,
        weight_min: weight_min.campo,
        weight_max: weight_max.campo,
        height_min: height_min.campo,
        height_max: height_max.campo,
        life_time_min: life_time_min.campo,
        life_time_max: life_time_max.campo,
        temperament: [...new Set([...dataForm.temperament, e.target.value])],
      });
    }
  }

  function RemoveTemperament(name) {
    setDataForm({
      ...dataForm,
      temperament: dataForm.temperament.filter((e) => e !== name),
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(dataForm);

    if (
      name.validate === "true" &&
      weight_min.validate === "true" &&
      weight_max.validate === "true" &&
      height_min.validate === "true" &&
      height_max.validate === "true" &&
      life_time_min.validate === "true" &&
      life_time_max.validate === "true"
    ) {
      setFormulariovalidate(true);

      await axios.post("http://localhost:3001/dogs", dataForm).then(
        setDataForm({
          name: "",
          weight_min: "",
          weight_max: "",
          height_min: "",
          height_max: "",
          life_time_min: "",
          life_time_max: "",
          temperament: [],
        })
      );

      setName({ campo: "", validate: "" });
      setWeight_min({ campo: "", validate: null });
      setWeight_max({ campo: "", validate: null });
      setHeight_min({ campo: "", validate: null });
      setHeight_max({ campo: "", validate: null });
      setLife_time_min({ campo: "", validate: null });
      setLife_time_max({ campo: "", validate: null });

      // ...
    } else {
      setFormulariovalidate(false);
    }
  };

  return (
    <main className={s.main}>
      <div className={s.div}>
        <Form onSubmit={onSubmit}>
          <Input
            state={name}
            setstate={setName}
            tipo="text"
            label="Dog Name:"
            placeholder="Dog name"
            name="name"
            leyendaError="The first letter should be in uppercase."
            leyendaError1="The name alredy exist, plase try whit another name"
            expresionRegular={expresiones.name}
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={weight_min}
            setstate={setWeight_min}
            tipo="number"
            label="Min weight in Kg:"
            placeholder="Min weight in Kg"
            name="weight_min"
            leyendaError="the minimum value cannot be greater than the maximum value"
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={weight_max}
            setstate={setWeight_max}
            tipo="number"
            label="Max Weight in Kg:"
            placeholder="Max Weight in Kg"
            name="weight_max"
            leyendaError="The maximum value cannot be less than the minimum value"
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={height_min}
            setstate={setHeight_min}
            tipo="number"
            label="Min Height in Cm:"
            placeholder="Min Height in Cm"
            name="height_min"
            leyendaError="The minimum value cannot be greater than the maximum value"
            funcion={validate}
          />
          <Input
            min={1}
            max={500}
            state={height_max}
            setstate={setHeight_max}
            tipo="number"
            label="Max Height in Cm:"
            placeholder="Max Height in Cm"
            name="height_max"
            leyendaError="the maximum value cannot be less than the minimum value"
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={life_time_min}
            setstate={setLife_time_min}
            tipo="number"
            label="Min life spect in years:"
            placeholder="Min life spect"
            name="life_time_min"
            funcion={validate}
            leyendaError="the minimum value cannot be greater than the maximum value"
          />
          <Input
            min={1}
            max={100}
            state={life_time_max}
            setstate={setLife_time_max}
            tipo="number"
            label="Max Life spect in years:"
            placeholder="Max life spect in years"
            name="life_time_max"
            leyendaError="the maximum value cannot be less than the minimum value"
            funcion={validate}
          />
          <div>
            <Label>select Temperament:</Label>
            <Select
              name="temperament"
              id="temper1"
              onChange={handlertemperament}
            >
              <option disabled selected>
                Chose temperament
              </option>
              {allTemperaments?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </Select>
            <ul>
              <li>
                {dataForm.temperament?.map((temp) => (
                  <button
                    key={temp}
                    className={s.botonTemp}
                    onClick={() => RemoveTemperament(temp)}
                  >
                    {temp}
                  </button>
                ))}
              </li>
            </ul>
          </div>

          {formulariovalidate === false && (
            <MensajeError>
              <p>
                <b>❌ Error:</b> Please fill in the form correctly.
              </p>
            </MensajeError>
          )}
          <ContenedorBotonCentrado>
            <Boton type="submit">Create dog</Boton>
            {formulariovalidate === true && (
              <MensajeExito>✅ Form sent successfully!</MensajeExito>
            )}
          </ContenedorBotonCentrado>
        </Form>
        <Boton>
          <Link className={s.link} to="/home">
            Home
          </Link>
        </Boton>
      </div>
    </main>
  );
};

export default FormDog;

// __Ruta de creación de raza de perro__: debe contener

// - [v ] Un formulario __controlado con JavaScript__ con los siguientes campos:
//   - Nombre
//   - Altura (Diferenciar entre altura mínima y máxima)
//   - Peso (Diferenciar entre peso mínimo y máximo)
//   - Años de vida
// - [v] Posibilidad de seleccionar/agregar uno o más temperamentos
// - [ v] Botón/Opción para crear una nueva raza de perro
