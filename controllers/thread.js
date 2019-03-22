const urlSlug = require('url-slug');

// Load Models
const Thread = require('../models/thread-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');
const Category = require('../models/category-model');

// Load Validation
const validateThreadInput = require('../validation/thread');


// @route   GET api/thread/:category
// @desc    get all threads/by category
// @access  Public 
// (public Route)
exports.getAllThreads = async (req, res, next) => {
  try {
    let threads = await Thread.findAll({
       include: [
         {
           model: User,
         },
         {
           model: Category
         }
       ]
     });
     if(!threads) {
       res.status(400).json({message: 'No Threads'});
       return;
     }else{
       res.status({success: true, threads});
       return;
     }
  } catch (error) {
    next(error);
  }
}


// @route   Post api/thread/
// @desc    create a new thread
// @access  Private 
// (private Route)
exports.postThread = async (req, res, next) => {
  try {
    const { errors, isValid } = validateThreadInput(req.body);
      // check validation
      if (!isValid) {
        // Return errors with 400 status
        return res.status(400).json(errors);
      }
      // const name = req.body.name;
      // const catId = req.body.categoryId;
      
    const slug = urlSlug(req.body.name);
    const { name, categoryId, content } = req.body
  
     await req.user.createThread({
        slug: slug,
        name: name,
        categoryId: categoryId,
        content: content
      })

      res.json({ success: true, message: 'Thread Created!'})
  } catch (error) {
    next(error);
  }
};



// @route   GET api/thread/:thread
// @desc    Get Single thread by slug name and ID
// @access  Public 
// (public Route)
exports.getSingleThread = async (req, res, next) => {
  try {
    let thread = await Thread.findOne({
      where: {
        slug: req.params.thread
      },
      include: [
        {
          model: User, attributes: ['username', 'createdAt', 'id', 'avatar']
        },
        {
          model: Category, attributes: ['id', 'name', 'value', 'color']
        },
        {
          model: Post,
          order: [ ['id', 'DESC'] ],
          include: [
            {model: Post, as: 'Replies', include: [
              {model: User, attributes: ['username', 'id', 'avatar']}
            ]},
            {model: User, as: 'Likes', attributes: ['username', 'createdAt', 'id', 'avatar']},
            {model: Thread, attributes: ['slug']},
            {model: User, attributes: ['username', 'id', 'avatar']},
          ]
        }
      ]
    });
    if(!thread) {
      res.status(400).json({message: 'No Thread'});
      return;
    }else{
      res.json({ success: true, thread })
    }
  } catch (error) {
    next(error);
  }
}


// @route   DELETE api/thread/:thread/:id
// @desc    delete thread by slug name and ID
// @desc    and check if user is authorized.
// @access  Private 
// (private Route)
exports.removeThread = async (req, res, next) => {
  try {
    let thread = await Thread.findOne({
      where: {
        id: req.body.id,
        slug: req.params.thread
      }
    });

    if(!thread){
      res.status(400).json({message: 'Thread not found'});
      return;
    } else if (thread.userId === req.user.id){
      await thread.destroy();
      res.json({success: true, message: 'Thread deleted.'});
      return;
    }else{
      res.status(400).json({notauthorized: 'User not authorized'});
      return;
    }
    
  } catch (error) {
    next(error);
  }
}