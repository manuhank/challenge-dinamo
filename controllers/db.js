import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('File', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});