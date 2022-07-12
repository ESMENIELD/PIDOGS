const { Dog, Temper } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const { API_KEY } = process.env;

const getDogsFromApi = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name,

      id: e.id,

      height_min: e.height.metric.split(" - ")[0],

      height_max: e.height.metric.split(" - ")[1],

      weight_min: e.weight.metric.split(" - ")[0],

      weight_max: e.weight.metric.split(" - ")[1],

      life_time_min: e.life_span.split(" - ")[0],

      life_time_max: e.life_span.split(" - ")[1],

      temperament: e.temperament ? e.temperament : "Unknown",

      image: e.image.url,
    };
  });

  return apiInfo; 
};

const loadInDb = async () => {
  const allDogsDb = await Dog.findAll({ include: Temper });

  createDogs = await allDogsDb.map((e) => { 
    let temperament = e.tempers?.map((e) => e.name);
    let temperaments = temperament?.join(", "); 
    //console.log(temperaments)
    return {
      id: e.id,

      name: e.name, 

      height_min: e.height_min ? e.height_min : "no data",

      height_max: e.height_max ? e.height_max : "no data",

      weight_min: e.weight_min ? e.weight_min : "no data",

      weight_max: e.weight_max ? e.weight_max : "no data",

      life_time_min: e.life_time_min ? e.life_time_min : "no data",

      life_time_max: e.life_time_max ? e.life_time_min : "no data",

      temperament: temperaments,

      userCreated: e.userCreated,

      image: e.image? e.image: 'https://i.pinimg.com/564x/65/2f/c5/652fc5be632b0eaf2d9e1596afb4bd8b.jpg',
    };
  });




  return createDogs;
};

const getAllInfo = async () => {
  const infoApi = await getDogsFromApi();
  const infoDb = await loadInDb();
  const allInfo = infoApi.concat(infoDb);
  return allInfo;
};

const loadTemperInDb = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const data = await apiUrl.data.map((e) => e.temperament);

  let temperaments = data.join(", ").split(", ");

  temperaments = temperaments.filter((el) => el);

  temperaments = [...new Set(temperaments)].sort();
 
  temperaments.forEach(async (el) => {
    await Temper.findOrCreate({
      where: { name: el },
    });
  });
  return await Temper.findAll();
};

module.exports = {
  getAllInfo,

  loadTemperInDb,
};

// - [ ] __GET /dogs__:
//   - Obtener un listado de las razas de perro
//   - Debe devolver solo los datos necesarios para la ruta principal
// - [ ] __GET /dogs?name="..."__:
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
