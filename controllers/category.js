const express = require("express");
const router = express.Router();


// Load Models
const Category = require('../models/category-model');
const User = require('../models/user-model');
const Thread = require('../models/thread-model');
const Post = require('../models/post-model');

// Load Validation
const validateCategoryInput = require('../validation/thread');


// @route   GET api/categories/:category
// @desc    Get all threads by category id
// @access  Public 
// (public Route)
exports.getAll = async (req, res) => {
try {
  let threads, threadsLatestPost, resThreads

  function threadInclude(order) {
    let options = {
      model: Thread,
      order: [
        ['id', 'DESC']
      ],
      where: {},
      include: [
        Category,
        {
          model: User,
          attributes: ['username', 'createdAt', 'id', 'avatar']
        },
        {
          model: Post,
          order: [
            ['id', 'DESC']
          ],
          include: [{
            model: User,
            attributes: ['username', 'id']
          }]
        }
      ]
    }
    return [options];
  }




  if (req.params.category === 'ALL') {
    threads = await Thread.findAll(threadInclude('ASC')[0]);
    threadsLatestPost = await Thread.findAll(threadInclude('DESC')[0]);
  } else {
    threads = await Category.findOne({
      where: {
        value: req.params.category
      },
      include: threadInclude('ASC')
    })

    threadsLatestPost = await Category.findOne({
      where: {
        value: req.params.category
      },
      include: threadInclude('DESC')
    })
  }

  if (!threads) {
    res.json('category does not exists');
    return;
  }

  if (Array.isArray(threads)) {
    resThreads = {
      name: 'All',
      value: 'ALL',
      Threads: threads
    }

    threadsLatestPost = {
      Threads: threadsLatestPost
    }
  } else {
    resThreads = threads.toJSON()
  }

    res.json(resThreads);
  } catch (error) {
    res.json(error);
  }
}


// @route   Post api/category/
// @desc    Create New Category
// @access  Private (Admin Level)
// (private admin Route)
exports.postCategory = (req, res, next) => {
  const { errors, isValid } = validateCategoryInput(req.body);

    // check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }

  const { name, color } = req.body;
  var bigName = name;
  const value = bigName.toUpperCase();

  
  Category.create({ name, color, value })
    .then(categoryDoc => res.json(categoryDoc))
    .catch(err => next(err));
};