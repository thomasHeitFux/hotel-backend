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
                type: DataTypes.INTEGER,
              },
  
        },{ timestamps: false }
    );
}