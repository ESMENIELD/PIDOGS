const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("temper", {
    name: {
      type: DataTypes.STRING,
      allownull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
