import React from 'react'
import{Link} from 'react-router-dom'



function Dog({id, name, image, weight_min, weight_max, temperament }) {
  return (
    <div key={id}>
        <h2 >{name}</h2>
          <div >
            <img src={image} alt="dog img"/>
          </div>
          <h3>weight_min:{weight_min} kg</h3>
          <h3>weight_max:{weight_max} kg</h3>
          <h3>temperamento: {temperament}</h3>

          
        <Link to ={`/detail/${id}`}>show Detail</Link>
    </div>
  )
}

export default Dog


// - [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Temperamento
//   - Peso