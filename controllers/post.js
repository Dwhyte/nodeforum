// Load Post Model
const Post = require('../models/post-model');



// Load Validation
const validatePostInput = require('../validation/post');



// @route   Post api/post/
// @desc    Create New Post
// @access  Private
// (private Route)
exports.createPost = async (req, res, next) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
  
    // check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }
  
    const { name, content, threadId } = req.body;
  
   newPost = await req.user.createPost({
      name: name,
      content: content,
      threadId: threadId
    })
    res.json({
      success: true,
      newPost
    })
    
  } catch (error) {
    res.json(error);
  }
  
}