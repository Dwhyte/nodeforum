const express = require("express");
const passport = require("passport");
const CatListController = require('../controllers/catList');
const router = express.Router();


// api/v1/threads => POST  (ADMIN)
router.post('/', passport.authenticate('jwt', { session: false }), CatListController.postCategory);


// api/v1/category/categories => GET (ADMIN)
router.get('/names', CatListController.GetCategoryNames);



module.exports = router;