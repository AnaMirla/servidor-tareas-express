const { Pool, Client } = require("pg");
const dotenv = require("dotenv");
const fs = require('fs');
const { error } = require("console");
const { release } = require("os");
dotenv.config()
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("src/certs/ca.crt").toString(),
  }
});
//verificar la conexion a la base de datos
pool.connect((error, Client, release) => {
  if (error) {
    console.log("error de conexion", error.stack);
  } else {
    console.log("conexion exitosa");
    release();
  }
});
module.exports = pool;