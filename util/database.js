require('dotenv').config();

// Use Sequelize ORM (Object Relational Mapping - to query mysql database faster and cleaner)
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST
});

module.exports = sequelize;