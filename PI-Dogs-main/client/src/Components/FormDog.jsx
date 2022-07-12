import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTemperaments } from "../Redux-actions";
import {
  Select,
  Form,
  Label,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "../Style/formulario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import s from "../Style/formDog.module.css";

const FormDog = () => {
  const allTemperaments = useSelector((state) => state.temperaments); //---traigo los estados globales.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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

  const expresiones = {
    name: /^[A-Z]+[A-Za-z0-9\s]+$/g,
    numbers: /^[1-99]\d*(\.\d+)?$/,
  };

  const validate = () => {
    if (weight_min.campo.length > 0) {
      if (weight_min.campo > weight_max.campo) {
        setWeight_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setWeight_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }
    if (height_min.campo.length > 0) {
      if (height_min.campo > height_max.campo) {
        setHeight_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setHeight_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }
    if (life_time_min.campo.length > 0) {
      if (life_time_min.campo > life_time_max.campo) {
        setLife_time_max((prevState) => {
          return { ...prevState, validate: "false" };
        });
      } else {
        setLife_time_max((prevState) => {
          return { ...prevState, validate: "true" };
        });
      }
    }
  };
  function handlertemperament(e) {
    
    e.preventDefault();
    if (dataForm.temperament.length===3){
      alert('only add 3 temperaments')
    }else if(dataForm.temperament.length<3 && dataForm.temperament.map(el=> el!== e.target.value)){
      setDataForm({
        ...dataForm,
        name: name.campo,
        weight_min: weight_min.campo,
        weight_max: weight_max.campo,
        height_min: height_min.campo,
        height_max: height_max.campo,
        life_time_min: life_time_min.campo,
        life_time_max: life_time_max.campo,
        temperament: [...dataForm.temperament, e.target.value],
      });

    }
  };

  function RemoveTemperament(name) {
    setDataForm({
      ...dataForm,
      temperament: dataForm.temperament.filter((e) => e !== name),
    });
  }

  const onSubmit = (e) => {
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

      axios.post("http://localhost:3001/dogs", dataForm).then(
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
        <Form action="" onSubmit={onSubmit}>
          <Input
            state={name}
            setstate={setName}
            tipo="text"
            label="Dog Name"
            placeholder="Dog name"
            name="name"
            leyendaError="the first letter should be in uppercase."
            expresionRegular={expresiones.name}
          />
          <Input
            min={1}
            max={100}
            state={weight_min}
            setstate={setWeight_min}
            tipo="number"
            label="Weigth Min"
            placeholder="min weight"
            name="weight_min"
            leyendaError="only numbers "
            leyendaError1="the minimum value cannot be greater than the maximum value"
            expresionRegular={expresiones.numbers}
          />
          <Input
            min={1}
            max={100}
            state={weight_max}
            setstate={setWeight_max}
            tipo="number"
            label="Max Weight"
            placeholder="Max Weight"
            name="weight_max"
            leyendaError="Only numbers"
            leyendaError1="the maximum value cannot be less than the minimum value"
            expresionRegular={expresiones.numbers}
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={height_min}
            setstate={setHeight_min}
            tipo="number"
            label="min Height"
            placeholder="min Height"
            name="height_min"
            leyendaError="only numbers"
            leyendaError1="the minimum value cannot be greater than the maximum value"
            expresionRegular={expresiones.numbers}
          />
          <Input
            min={1}
            max={100}
            state={height_max}
            setstate={setHeight_max}
            tipo="number"
            label="max Height"
            placeholder="max Height"
            name="height_max"
            leyendaError="only numbers "
            leyendaError1="the maximum value cannot be less than the minimum value"
            expresionRegular={expresiones.numbers}
            funcion={validate}
          />
          <Input
            min={1}
            max={100}
            state={life_time_min}
            setstate={setLife_time_min}
            tipo="number"
            label="min life spect"
            placeholder="min life spect"
            name="life_time_min"
            leyendaError="only numbers"
            leyendaError1="the minimum value cannot be greater than the maximum value"
            expresionRegular={expresiones.numbers}
          />
          <Input
            min={1}
            max={100}
            state={life_time_max}
            setstate={setLife_time_max}
            tipo="number"
            label="max Life spect"
            placeholder="max life spect"
            name="life_time_max"
            leyendaError="only numbers"
            leyendaError1="the maximum value cannot be less than the minimum value"
            expresionRegular={expresiones.numbers}
            funcion={validate}
          />
          <div>
            <Label>select Temperament:</Label>
            <Select
            defaultValue={"select"}
              name="temperament"
              id="temper1"
              onChange={handlertemperament}
            >
              
              <option disabled selected>Chose temperament</option>
              {allTemperaments?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </Select>
            <ul>
              <li>
              {dataForm.temperament?.map((temp) => (
              
              <button key={temp}  className={s.botonTemp}
              onClick={() => RemoveTemperament(temp)}>
                {temp}
                
              </button>
              
            ))}

              </li>
            </ul>
            
          </div>

          {formulariovalidate === false && (
            <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <b>Error:</b> Please fill in the form correctly.
              </p>
            </MensajeError>
          )}
          <ContenedorBotonCentrado>
            <Boton type="submit">Create dog</Boton>
            {formulariovalidate === true && (
              <MensajeExito>Form sent successfully!</MensajeExito>
            )}
          </ContenedorBotonCentrado>
        </Form>
      </div>
    </main>
  );
};

export default FormDog;

// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import {  getTemperaments } from "../Redux-actions";
// import s from '../Style/formDog.module.css'

// function FormDog() {
//   //--------- estados globales y locales
//   const allTemperaments = useSelector((state) => state.temperaments); //---traigo los estados globales.
//   const dispatch = useDispatch();
//   useEffect(() => {

//     dispatch(getTemperaments());
//   }, [dispatch]);

//   //----ESTADOS LOCALES

//   const [dataForm, setDataForm] = useState({
//     name: "",
//     weight_min: "",
//     weight_max: "",
//     height_min: "",
//     height_max: "",
//     life_time_min: "",
//     life_time_max: "",
//     temperament: [],
//   });

//   //----funciones para recopilar los datos y validarlos

//   function handlerDataForm(e) {
//     e.preventDefault()
//     setDataForm({
//       ...dataForm,
//       [e.target.name]: e.target.value,
//     });

//   }

//   function handlertemperament(e) {

//     setDataForm({
//         ...dataForm,
//       temperament: [...dataForm.temperament, e.target.value],

//     });

//   }

//   function RemoveTemperament(name) {
//    setDataForm({
//     ...dataForm,
//     temperament: dataForm.temperament.filter(e=> e !== name)

//    })

//   }

//   const handlerSubmit = async (e) => {
//     e.preventDefault();

//   console.log(dataForm)
//     await axios.post("http://localhost:3001/dogs", dataForm);

//     alert("Dog created");

//     setDataForm({
//       name: "",
//       weight_min: "",
//       weight_max: "",
//       height_min: "",
//       height_max: "",
//       life_time_min: "",
//       life_time_max: "",
//       temperament:[]
//     });
//   };

//   return (
//     <div key="form" className={s.main}>
//       <form onSubmit={handlerSubmit} className={s.form}>
//         <div>
//           <label>Dog's name:</label>
//           <input
//             type="text"
//             id="name1"
//             onChange={handlerDataForm}
//             name="name"
//             value={dataForm.name}
//             required
//           />

//         </div>
//         <div>
//           <label>Minimum weight:</label>
//           <input
//             type="number"
//             id="peso_min"
//             onChange={handlerDataForm}
//             name="weight_min"
//             value={dataForm.weight_min}
//             required
//           />

//         </div>
//         <div>
//           <label>Maximun weight:</label>
//           <input
//             type="number"
//             id="peso_max"
//             onChange={handlerDataForm}
//             name="weight_max"
//             value={dataForm.weight_max}
//             required
//           />

//         </div>
//         <div>
//           <label>Minimum height:</label>
//           <input
//             type="number"
//             id="altura_min"
//             onChange={handlerDataForm}
//             name="height_min"
//             value={dataForm.height_min}
//             required
//           />

//         </div>
//         <div>
//           <label>Maximum height:</label>
//           <input
//             type="number"
//             id="altura_max"
//             onChange={handlerDataForm}
//             name="height_max"
//             value={dataForm.height_max}
//             required
//           />

//         </div>
//         <div>
//           <label>Minimum life spect:</label>
//           <input
//             type="number"
//             id="lifemin1"
//             name="life_time_min"
//             onChange={handlerDataForm}
//             value={dataForm.life_time_min}
//             required
//           />

//         </div>
//         <div>
//           <label>Maximum life spect:</label>
//           <input
//             type="number"
//             id="lifemax1"
//             onChange={handlerDataForm}
//             name="life_time_max"
//             value= {dataForm.life_time_max}
//             required
//           />

//         </div>
//         <div>
//           <label>select Temperament:</label>
//           <select
//             name="temperament"
//             id="temper1"
//             onChange={handlertemperament}
//           >
//             {allTemperaments?.map((e) => (
//               <option value={e.name} key={e.id}>{e.name}</option>
//             ))}
//           </select>
//           {dataForm.temperament?.map((temp) => (
//           <p key={temp}>

//             {temp}
//             <button onClick={() => RemoveTemperament(temp)}>X</button>
//           </p>
//         ))}
//         </div>
//         <button type="submit">Create</button>

//       </form>
//     </div>
//   );
// }

// export default FormDog;

// // __Ruta de creación de raza de perro__: debe contener

// // - [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
// //   - Nombre
// //   - Altura (Diferenciar entre altura mínima y máxima)
// //   - Peso (Diferenciar entre peso mínimo y máximo)
// //   - Años de vida
// // - [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// // - [ ] Botón/Opción para crear una nueva raza de perro
