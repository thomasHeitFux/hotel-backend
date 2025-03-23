require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const DB_STORAGE = process.env.DB_STORAGE || "./db.sqlite"; // Ruta para el archivo SQLite

const DEVELOPMENT = false;

// Configuración para SQLite
const sequelize = DEVELOPMENT
  ? new Sequelize({
      dialect: 'sqlite',
      storage: DB_STORAGE, // Usamos SQLite y definimos la ruta del archivo
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: DB_STORAGE, // Usamos SQLite y definimos la ruta del archivo
      logging: false,
    });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos los modelos desde la carpeta "models"
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Asociamos los modelos al Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos (pasando la primera letra a mayúscula)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Exportamos los modelos
module.exports = {
  ...sequelize.models,
  conn: sequelize, // Exportamos la conexión a la base de datos
};
