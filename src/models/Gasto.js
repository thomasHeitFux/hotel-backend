const {DataTypes} = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define(
        "Gasto",{
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
            fecha:{
                type:DataTypes.STRING,
                allowNull:false,
            },
              importe: {
                type: DataTypes.FLOAT,
              },
              metodo: {
                type: DataTypes.STRING,
              },
              tipo: {
                type: DataTypes.STRING,
              },
              estructura: {
                type: DataTypes.STRING,
              },
              detalle: {
                type: DataTypes.STRING,
              },
              responsable: {
                type: DataTypes.STRING,
              },
  
        },{ timestamps: false }
    );
}