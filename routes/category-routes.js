const express = require("express");
const passport = require("passport");
const CategoryController = require('../controllers/category');
const router = express.Router();



// api/v1/category/ALL => GET
router.get('/:category', CategoryController.getAll);


module.exports = router;