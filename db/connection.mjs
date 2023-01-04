import { Sequelize } from "sequelize";
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
export const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});