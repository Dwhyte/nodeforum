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


User.belongsToMany(Thread, { through: 'userthreads' });
User.hasMany(Post);
Thread.belongsTo(User);
Thread.belongsTo(Category);
Thread.hasMany(Post);
Post.belongsTo(User);
Post.belongsTo(Thread);
Category.hasMany(Thread);
