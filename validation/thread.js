const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateThreadInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Thread title name must be between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Thread title is required';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Must add content';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}