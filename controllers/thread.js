const urlSlug = require('url-slug');

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
  ThreadModel.findAll()
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
    const slug = urlSlug(req.body.name);
    const name = req.body.name;
    const catId = req.body.categoryId;

    req.user.createThread({
      slug: slug,
      name: name,
      categoryId: catId
    })
    .then(result => {
      console.log('THREAD CREATED');
      res.json({ success: true, result});
    })
    .catch(err => res.json({ success: false, err}));
};