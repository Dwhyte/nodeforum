const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.content, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.content)) {
    errors.text = 'Text field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}