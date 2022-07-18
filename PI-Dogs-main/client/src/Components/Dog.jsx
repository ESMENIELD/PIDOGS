import React from "react";
import { Link } from "react-router-dom";
import s from "../Style/Dog.module.css";

function Dog({ id, name, image, weight_min, weight_max, temperament }) {
  const libras = (number) => {
    let lbs = number * 2.2;
    return Math.floor(lbs);
  };

  return (
    <div key={id} className={s.card}>
      <img src={image} alt="dog img" className={s.image} />
      <div className={s.boxtext}></div>
      <div className={s.text}>
        <h1>{name}</h1>

        <h3>Weight min:</h3>

        <h3 className={s.peso}>{weight_min} kg</h3>

        {weight_min ? (
          <h3 className={s.peso}>{libras(weight_min)} lbs</h3>
        ) : null}

        <h3>Weight max:</h3>

        <h3 className={s.peso}>{weight_max} kg</h3>
        {weight_max ? (
          <h3 className={s.peso}>{libras(weight_max)} lbs</h3>
        ) : null}

        <h2>Temperament:</h2>
        <h3> {temperament}</h3>

        <button className={s.boton}>
          <Link to={`/detail/${id}`} className={s.link}>
            show Detail
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Dog;

// - [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Temperamento
//   - Peso
