const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CategoryModel = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  color: Sequelize.STRING,
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = CategoryModel;