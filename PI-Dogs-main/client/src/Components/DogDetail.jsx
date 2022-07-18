import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById, getDogs } from "../Redux-actions";
import s from "../Style/Dog.module.css";
import { Link } from "react-router-dom";

function DogDetail() {
  const dogsDetail = useSelector((state) => state.dogsDetail);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getDogsById(id));
  }, [id]);

  const libras = (number) => {
    let lbs = number * 2.2;
    return Math.floor(lbs);
  };
  const pies = (number) => {
    let ft = number / 30.48;
    return ft.toFixed(2);
  };
  return (
    <div key={id}>
      {dogsDetail?.map((e) => {
        return (
          <div>
            <div>
              <img src={e.image} alt="dog img" className={s.img} />
            </div>
            <h4>{e.name}</h4>

            <div>
              <h3>weight_min:{e.weight_min} kg</h3>
              {e.weight_min ? (
                <h3>Weight min:{libras(e.weight_min)} lbs</h3>
              ) : null}
              <h3>weight_max:{e.weight_max} kg</h3>
              {e.weight_max ? (
                <h3>Weight max:{libras(e.weight_max)} lbs</h3>
              ) : null}
            </div>
            <div>
              <h3>Height_min:{e.height_min} cm</h3>
              {e.height_min ? (
                <h3>Height min:{pies(e.height_min)} ft</h3>
              ) : null}
              <h3>Height_max:{e.height_max} cm</h3>
              {e.height_max ? (
                <h3>Height max:{pies(e.height_max)} ft</h3>
              ) : null}
            </div>
            <div>
              <h3>Temperament: {e.temperament}</h3>
            </div>
            <button> <Link to='/home'> Home </Link></button>
          </div>
        );
      })}
    </div>
  );
}

export default DogDetail;

// - [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// - [ ] Altura
// - [ ] Peso
// - [ ] Años de vida
