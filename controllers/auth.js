const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = process.env.secretOrKey;


// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const UserModel = require("../models/user-model");



// @route   GET api/users/register
// @desc    Register user
// @access  Public

exports.getRegister = (req, res) => {
  const { errors, isValid  } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // otherwise check to see if the submitted email is taken.
  UserModel.findOne({
    where: { email: req.body.email }
  })
  .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      res.status(400).json(errors);
      return;
    } else {
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

      UserModel.create({
        username: req.body.username,
        email: req.body.email,
        encryptedPassword: scrambledPassword,
      });

      res.status(200).json(user)
      console.log(user);
    }
  })
  .catch(err => res.json({success: false, err}));
};


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

exports.getLogin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  UserModel.findOne({ email: email })
    .then(userFromDb => {
      if (!userFromDb) {
        errors.email = 'User Not Found';
        return res.status(404).json(errors);
      }


      if (bcrypt.compareSync(password, userFromDb.encryptedPassword) === false) {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
      }

      // User Matched
      const payload = {
        id: userFromDb.id,
        email: userFromDb.email,
        avatar: userFromDb.avatar
      }; // Create JWT Payload

      // Sign Token
      jwt.sign(
        payload,
        keys, {
          expiresIn: 10800
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    })
  .catch(err => res.json({success: false, err}));
};



// @route   GET api/users/current
// @desc    Return current user
// @access  Private

exports.getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar,
    cover: req.user.cover,
    description: req.user.description
  });
}