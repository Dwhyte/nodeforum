// Load Models
const Category = require('../models/category-model');
const User = require('../models/user-model');
const Thread = require('../models/thread-model');
const Post = require('../models/post-model');

// Load Validation
const validateCategoryInput = require('../validation/category');


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
        Category, { model: User,  attributes: ['username', 'createdAt', 'id', 'avatar'] },
        {
          model: Post,
          order: [ ['id', order] ],
          include: [{ model: User, attributes: ['username', 'id'] }]
        }
      ]
    }
    return [options];
  }

  if (req.params.category === 'ALL') {
    threads = await Thread.findAll(threadInclude('ASC')[0]);
    threadsLatestPost = await Thread.findAll(threadInclude('DESC')[0]);
        // // Default page = 1 and paginate = 25
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

  // if no threads,
  if (!threads) {
    res.json('Threads does not exists for this category');
    return;
  }

  // if threads is an array,
  // create a new array, and assign variables
  // else, just send threads
  if (Array.isArray(threads)) {
    resThreads = {
      name: 'All',
      value: 'ALL',
      threads: threads
    }

    threadsLatestPost = {
      threads: threadsLatestPost
    }
  } else {
    resThreads = threads.toJSON()
  }
    res.json(resThreads);
    // console.log(resThreads);

  } catch (error) {
    res.json(error);
  }
}