import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById, cleanDetail } from "../Redux-actions";
import s from "../Style/dogDetail.module.css";
import { Link } from "react-router-dom";

function DogDetail() {
  const dogsDetail = useSelector((state) => state.dogsDetail);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
  
    dispatch(getDogsById(id));
    return ()=>{
      dispatch(cleanDetail())
    }
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
            <div className={s.divu}>
              <img src={e.image} alt="dog img" className={s.img} />
              <h1>{e.name}</h1>

              <div className={s.divl}>
                <h3>Weight min:</h3>
                <h2>{e.weight_min} kg</h2>
                {e.weight_min ? <h2>{libras(e.weight_min)} lbs</h2> : null}
                <h3>Weight max:</h3>
                <h2>{e.weight_max} kg</h2>
                {e.weight_max ? <h2>{libras(e.weight_max)} lbs</h2> : null}

                <h3>Height min:</h3>
                <h2>{e.height_min} cm</h2>
                {e.height_min ? <h2>{pies(e.height_min)} ft</h2> : null}
                <h3>Height max:</h3>
                <h2>{e.height_max} cm</h2>
                {e.height_max ? <h2>{pies(e.height_max)} ft</h2> : null}

                <h3>Life time spect</h3>
                <h2>
                  {e.life_time_min}-{e.life_time_max}{" "}
                </h2>

                <h2>Temperament: </h2>
                <h3>{e.temperament}</h3>
                <button className={s.boton}>
              {" "}
              <Link className={s.link} to="/home"> Home </Link>
            </button>
              </div>
            </div>

           
          </div>
        );
      })}
    </div>
  );
}

export default DogDetail;

// - [v ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// - [ v] Altura
// - [v ] Peso
// - [v ] Años de vida
