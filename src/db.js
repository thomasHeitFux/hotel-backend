require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, PRODUCTION, DATABASE_URL } = process.env;

const sequelize = PRODUCTION?
   new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/users`,
      {
        logging: false,
        native: false,
      }
    )
  : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/hotel`, {
      logging: false,
      native: false,
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false,
      //   },
      // },
    });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Gasto,Tipo,Estructura,Metodo,Responsable,Detalle } = sequelize.models;

Tipo.belongsTo(Gasto,{through:"gasto_Tipo"});
Gasto.belongsToMany(Tipo,{through:"gasto_Tipo"});

Detalle.belongsToMany(Gasto,{through:"gasto_detalle"});
Gasto.belongsToMany(Detalle,{through:"gasto_detalle"});

Responsable.belongsToMany(Gasto,{through:"gasto_responsable"});
Gasto.belongsToMany(Responsable,{through:"gasto_responsable"});
// 

Estructura.belongsToMany(Gasto,{through:"gasto_estructura"});
Gasto.belongsToMany(Estructura,{through:"gasto_estructura"});

Metodo.belongsToMany(Gasto,{through:"gasto_metodo"});
Gasto.belongsToMany(Metodo,{through:"gasto_metodo"});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};