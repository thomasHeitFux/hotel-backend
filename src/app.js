const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

// En producción, usamos la URL de tu frontend desplegado en Vercel
const URL_PRODUCTION = "https://hotel-frontend-mu.vercel.app"; // URL de tu frontend en Vercel

require("./db.js");

const server = express();

server.name = "API";

// Middleware de CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", URL_PRODUCTION); // Permite solicitudes desde la URL de producción
  res.header("Access-Control-Allow-Credentials", "true"); // Permite el manejo de credenciales (cookies, etc.)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, PUT, DELETE");

  // Si la solicitud es OPTIONS, respondemos inmediatamente
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use("/", routes);

// Middleware de manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
