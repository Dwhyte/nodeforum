const express = require("express");
const passport = require("passport");
const CategoryController = require('../controllers/category');
const router = express.Router();



// api/v1/category/ALL => GET
router.get('/:category', CategoryController.getAll);

// api/v1/threads => POST
router.post('/', passport.authenticate('jwt', {
  session: false
}), CategoryController.postCategory);





module.exports = router;