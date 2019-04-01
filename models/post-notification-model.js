const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const PostNotificationModel = sequelize.define('PostNotification', {});

module.exports = PostNotificationModel;