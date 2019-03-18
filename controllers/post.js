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
  
    const { content, threadId, replyingToUsername, replyId } = req.body;
  
   newPost = await req.user.createPost({
      content: content,
      threadId: threadId,
      replyId: replyId,
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
          username: req.user.username
        }
      }
    );
     
    // check if post exists.
    if(!post){ 
      res.status(400).json({ message: 'post does not exist' });
      return; 
    }
    
    // check if user is trying to like their own post.
    if(post.userId === req.user.id){ 
      res.status(400).json({message: 'Cannot like own post'});
      return;
    }

    // // check if auth user already liked this post.
    // if(post.likes.username === req.user.username){
    //   res.status(400).json({message: 'Already liked this post.'});
    //   return;
    // }


    await post.addLikes(user);
    res.json({ success: true });


  } catch (error) {
    next(error);
  }
}


// @route   PUT api/post/post_id/dislike
// @desc    Dislike a user's Post
// @access  Private
// (private Route)
exports.disLikePost = async (req, res, next) => {
  try {
    
    let post = await Post.findByPk(req.params.post_id);    
    let user = await User.findOne(
      {
        where: {
          username: req.body.username
        }
      }
    );

    // check if post exists.
    if(!post) {
      res.status(400).json({ message: 'post does not exist'});
      return;
    }

    await post.removeLikes(user)
    res.json({ success: true });



  } catch (error) {
    next(error);
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
    res.status(401).json({ message: 'user not authorized.' });
    return;
  }

  await thePost.destroy();
  res.json({ message: 'Post has been removed.'})

  } catch (error) {
    next(error);
  }
}

