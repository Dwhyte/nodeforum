const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateThreadInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Thread name must be between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}