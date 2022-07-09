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
      <h2>{name}</h2>
      <div>
        <img src={image} alt="dog img" className={s.img} />
      </div>

      <div>
        <h3>weight_min:{weight_min} kg</h3>
        {weight_min ? <h3>Weight min:{libras(weight_min)} lbs</h3> : null}
        <h3>weight_max:{weight_max} kg</h3>
        {weight_max ? <h3>Weight max:{libras(weight_max)} lbs</h3> : null}
      </div>

      <h3>Temperament: {temperament}</h3>

      <Link to={`/detail/${id}`}>show Detail</Link>
    </div>
  );
}

export default Dog;

// - [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Temperamento
//   - Peso
