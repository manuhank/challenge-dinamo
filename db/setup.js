require("dotenv").config();
const mysql = require("mysql2/promise");
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

mysql
  .createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD,
  })
  .then((connection) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};`
    );
  });
