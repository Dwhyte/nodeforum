// Load Post Model
const Post = require('../models/post-model');
const User = require('../models/user-model');



// Load Validations
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
  
    const { name, content, threadId, replyingToUsername } = req.body;
  
   newPost = await req.user.createPost({
      name: name,
      content: content,
      threadId: threadId,
      replyingToUsername: replyingToUsername
    })
    res.json({
      success: true,
      newPost
    })
    
  } catch (error) {
    res.json(error);
  }
  
}



// @route   PUT api/post/post_id/like
// @desc    like a user's Post
// @access  Private
// (private Route)
exports.likePost = async (req, res, next) => {
  try {
    
    let post = await Post.findByPk(req.params.post_id);
    let user = await User.findOne(
      { 
        where: { 
          username: req.body.username 
        }
      }
    );

    if(!post){ 
      res.status(400).json({ message: 'post does not exist' }); 
    }
    if(post.userId === req.user.id){ 
      res.status(400).json({message: 'Cannot like own post'});
    }

    await post.addLikes(user);
    res.json({ success: true });


  } catch (error) {
    res.status(500).json({
      error
    })
  }
}


// @route   PUT api/post/post_id/dislike
// @desc    Dislike a user's Post
// @access  Private
// (private Route)
exports.disLikePost = async (req, res, next) => {
  try {
    
    let post = await Post.findByPk(req.params.post_id);

    if (!post) {
      res.status(400).json({
        message: 'post does not exist'
      });
    }


    let user = await User.findOne(
      {
        where: {
          username: req.body.username
        }
      }
    );

    await post.removeLikes(user)
    res.json({ success: true });



  } catch (error) {
    res.json(error);
  }
}

















// @route   Delete api/post/id/delete
// @desc    Delete Post
// @access  Private
// (private Route)
exports.deletePost = async (req, res, next) => {
  try {

  // find the post
  thePost = await Post.findByPk(req.params.id);

  // check if post -> userId matches auth user's id
  if(thePost.userId !== req.user.id) {
    res.status(401).json({
      message: 'user not authorized.'
    });
  }

 await thePost.destroy();
   res.json({
     message: 'Post has been removed.'
   })

  } catch (error) {
    res.json(error);
  }
}

