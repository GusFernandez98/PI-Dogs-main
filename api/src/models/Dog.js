const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_spanMin: {
      type: DataTypes.STRING,
    },
    life_spanMax: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl : true,
      }
    },
    createdInDb : {
      type:  DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
     },
  },
   {timestamps: false} 
  );
};
