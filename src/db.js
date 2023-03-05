require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const DB_USER = process.env.DB_USER ||  "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
const DB_HOST = process.env.DB_HOST || "database-1.coqqvzjkhatj.us-east-1.rds.amazonaws.com";
const DB_URL = process.env.DATABASE_URL ||  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`
const DEVELOPMENT = false;
// Username:    postgres
//   Password:    uF5hHMozG2LWHw5
//   Hostname:    dry-water-7481.internal
//   Flycast:     fdaa:1:7c9d:0:1::2
//   Proxy port:  5432
//   Postgres port:  5433
//   Connection string: postgres://postgres:uF5hHMozG2LWHw5@[fdaa:1:7c9d:0:1::2]:5432

const sequelize = 
DEVELOPMENT?
new Sequelize(DB_URL, {

  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})
:
   new Sequelize(DB_URL, {

      logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
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

const { Gasto} = sequelize.models;



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};