// Load Thread Model
const ThreadModel = require('../models/thread-model');
// const CatergoryModel = require('../models/thread-model');

// Load Validation
const validateThreadInput = require('../validation/thread');


// @route   GET api/thread/:category
// @desc    get all threads/by category
// @access  Public 
// (public Route)
exports.getAllThreads = (req, res) => {
  ThreadModel.find()
    .populate('category')
    .populate('user', ['username', 'avatar', '_id' ])
    .sort({ 
      createdAt: -1 // sort all by created date
    })
    .limit(10)
    .then(threadResults => res.json(threadResults))
    .catch(err => res.json(err));
}





// @route   Post api/thread/
// @desc    create a new thread
// @access  Private 
// (private Route)
exports.postThread = (req, res, next) => {
  const { errors, isValid } = validateThreadInput(req.body);

    // check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }

  const { slug, name } = req.body
  const user = req.user.id;
  const category = '5c8ab4d7707cd62f72056ced';
  

  ThreadModel.create({ slug, name, user, category })
    .then(threadDoc => res.json(threadDoc))
    .catch(err => next(err));
};