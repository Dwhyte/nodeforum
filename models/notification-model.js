const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const NotificationModel = sequelize.define('notification', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  interacted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  type: Sequelize.ENUM('mention', 'thread update', 'reply')
});

module.exports = NotificationModel;
