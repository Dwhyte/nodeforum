require('dotenv').config();

// Use Sequelize ORM (Object Relational Mapping - to query mysql database faster and cleaner)
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST
});

module.exports = sequelize;



// Relationships

const Thread = require('../models/thread-model');
const Category = require('../models/category-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');
const Notification = require('../models/notification-model');
const PostNotification = require('../models/post-notification-model');
// const UserThreads = require('../models/user-thread-model');


User.hasMany(Thread);
User.hasMany(Post);
// User.hasMany(Thread, { as: 'SavedThreads', foreignKey: 'savedthreadId'});
Thread.belongsTo(User);
Thread.belongsTo(Category);
Thread.hasMany(Post, { foreignKeyConstraint: true, onDelete: 'CASCADE' });
Post.belongsTo(User);
Post.belongsTo(Thread);
Post.hasMany(Post, { as: 'Replies', foreignKey: 'replyId' });
Post.belongsToMany(User, { as: 'Likes', through: 'user_post' });
Category.hasMany(Thread);
Notification.belongsTo(User);
PostNotification.belongsTo(User);
PostNotification.belongsTo(Post);
PostNotification.belongsTo(Notification);


