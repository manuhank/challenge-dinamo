const { Sequelize } = require("sequelize");
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = {
    db
}