const express = require("express");
const passport = require("passport");
const PostController = require('../controllers/post');
const router = express.Router();



router.post('/', passport.authenticate('jwt', {
  session: false
}), PostController.createPost);


router.delete('/:id/delete', passport.authenticate('jwt', {
  session: false
}), PostController.deletePost);


router.put('/:post_id/like', passport.authenticate('jwt', {
  session: false
}), PostController.likePost);


router.delete('/:post_id/dislike', passport.authenticate('jwt', {
  session: false
}), PostController.disLikePost);


module.exports = router;