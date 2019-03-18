const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
   type: Sequelize.STRING,
   unique: true,
   allowNull: false
  },
  encryptedPassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.STRING,
  avatar: Sequelize.STRING,
  cover: Sequelize.STRING
});

module.exports = UserModel;