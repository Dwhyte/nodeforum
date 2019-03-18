const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const PostModel = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  replyingToUsername: {
    type: Sequelize.STRING
  },
  removed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = PostModel;