const { Dog } = require("../db");
const { Router } = require("express");
const { getAllInfo, loadTemperInDb } = require("./Controller");

const router = Router();

router.get("/dogs", async (req, res, next) => {
  const name = req.query.name;
  const allDogs = await getAllInfo();
  //console.log(allDogs)
  try {
    if (name) {
      const dogName = allDogs.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(dogName);
      dogName.length
        ? res.status(200).send(dogName)
        : res
            .status(404)
            .send(
              `the dog ${name} doesn't exist, please try with another name`
            );
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/dogs/:id", async (req, res, next) => {
  const { id } = req.params;
  const allDogs = await getAllInfo();
//console.log(id);

  try {
    if (id) {
      const dogId = allDogs.filter((e) => e.id == id);
      // console.log(dogId);
      dogId
        ? res.status(200).send(dogId)
        : res.status(404).send(`the dog with id: ${id} doesn't exist`);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/dogs", async (req, res, next) => {
  try {
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      temperament 
    } = req.body;

    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      userCreated: true 
    });
     
    await newDog.addTemper(temperament);
    
    res.status(201).json(newDog);
  } catch (error) {
    next(error);
  }
});

router.get("/temperaments", async (req, res, next) => {
  try {
    const allTemperaments = await loadTemperInDb();
    //console.log(allTemperaments);
    res.status(200).json(allTemperaments);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", async (req,res,next)=>{
  const {id}= req.params;
  console.log(id);
  const{
    name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_time_min,
      life_time_max,
      temperament
  }=req.body;
 
  try {
  //  let tempers= await temperament.map(e=>e).join(', ')
  //  console.log(tempers);
let perri=await Dog.findByPk(id)
console.log(perri);
await perri.set(
      {
        name:name,
        height_min: height_min,
        height_max: height_max,
        weight_min: weight_min,
        weight_max: weight_max,
        life_time_min: life_time_min,
        life_time_max: life_time_max
        
       
  
      },
      {
        where: {id}
      }
     );
     perri.setTempers(temperament)

  
    res.status(200).send(perri)
    
  } catch (error) {
    next(error)
  }
  
});


//----------put y delete


module.exports = router;

// - [+ ] __GET /dogs__:
//   - Obtener un listado de las razas de perro
//   - Debe devolver solo los datos necesarios para la ruta principal
//name, peso, imagen
// - [+ ] __GET /dogs?name="..."__:
//   - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
//   - Si no existe ninguna raza de perro mostrar un mensaje adecuado
// - [ ] __GET /dogs/{idRaza}__:
//   - Obtener el detalle de una raza de perro en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
//   - Incluir los temperamentos asociados
// - [ ] __POST /dogs__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
//   - Crea una raza de perro en la base de datos relacionada con sus temperamentos
// - [ ] __GET /temperaments__:
//   - Obtener todos los temperamentos posibles
//   - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí









// router.delete('/delete/:id', async (req,res,next)=>{
//   const {id}=req.params;
//   try {
//    await Dog.destroy({where:{id}})
//    res.status(200).send('dog deleted')
//   } catch (error) {
//     next(error)
//   }
// })
