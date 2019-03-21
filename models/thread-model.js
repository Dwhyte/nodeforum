const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const ThreadModel = sequelize.define('thread', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  postsCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  locked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = ThreadModel;