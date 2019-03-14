const express = require("express");
const router = express.Router();


// Load Category Model
const CategoryModel = require('../models/category-model');

// Load Validation
const validateCategoryInput = require('../validation/thread');


// @route   GET api/categories/:category
// @desc    Get all threads by category id
// @access  Public 
// (public Route)
exports.getAll = (req, res) => {
  const valueName = req.params.category;

  CategoryModel.findOne({ value: valueName })
    .populate('threads')
    .sort({
      createdAt: -1 // sort all by created date
    })
    .limit(10)
    .then(categoryResults => res.json(categoryResults))
    .catch(err => res.json(err));



  // CategoryModel.find()
  //   .then(categoryResults => res.json(categoryResults))
  //   .catch(err => res.json(err));
}


// @route   Post api/category/
// @desc    Create New Category
// @access  Private (Admin Level)
// (private admin Route)
exports.postCategory = (req, res, next) => {
  const { errors, isValid } = validateCategoryInput(req.body);

    // check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }

  const { name, color } = req.body;
  var bigName = name;
  const value = bigName.toUpperCase();

  
  CategoryModel.create({ name, color, value })
    .then(categoryDoc => res.json(categoryDoc))
    .catch(err => next(err));
};