// Load Models
const Category = require('../models/category-model');

// Load Validations
const validateCategoryInput = require('../validation/category');


// @route   Post api/category/
// @desc    Create New Category
// @access  Private (Admin Level)
// (private admin Route)
exports.postCategory = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCategoryInput(req.body);
  
      // check validation
      if (!isValid) {
        // Return errors with 400 status
        return res.status(400).json(errors);
      }
  
    const { name, color } = req.body;
    var bigName = name;
    const value = bigName.toUpperCase();
      
    newCategory = await Category.create({name, color, value});
    res.json({
      success: true,
      newCategory
    });  
  } catch (error) {
    next(error);
  }
};


// @route   GET api/categories/
// @desc    Get All Categories
// @access  Public
// (public Route)
exports.GetCategoryNames = async (req, res, next) => {
  try {
    let categories = await Category.findAll()

    if (!categories) {
      return res.status(400).json({nocategories: 'No Categories'})
    } else {
     return res.json({success: true, categories});
    }
  } catch (error) {
    next(error)
  }
}