const express = require("express");
const passport = require("passport");
const PostController = require('../controllers/post');
const router = express.Router();



// api/v1/category/ALL => GET
// router.get('/category/ALL', ThreadController.getAllThreads);


router.post('/', passport.authenticate('jwt', {
  session: false
}), PostController.createPost);




module.exports = router;