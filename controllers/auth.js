const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = process.env.secretOrKey;


// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require("../models/user-model");



// @route   GET api/users/register
// @desc    Register user
// @access  Public
exports.getRegister = async (req, res, next) => {
  try {
    const { errors, isValid  } = validateRegisterInput(req.body);

  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // otherwise check to see if the submitted email is taken.
    let user = await User.findOne({
      where: {
         username: req.body.username
      }
    })
  
    if (user) { // check if username exists in db
      errors.username = 'Username already exists';
      res.status(400).json(errors);
      return;
    } else {
      // continue........
      // encrypt password
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

      // create new user
      await User.create({
        username: req.body.username,
        encryptedPassword: scrambledPassword,
      })

      res.json({
        success: true
      })
    }

  } catch (error) {
    next(error)
  }
};


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

exports.getLogin = async (req, res, next) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;


    // find user by email
    let user = await User.findOne({
      where: {
        username: username
      }
    });

    // check if email was found in db
    if(!user) {
      errors.username = 'User Not Found';
      return res.status(404).json(errors);
    }

    // check if req.password matches user's encrypted password in db
    if (bcrypt.compareSync(password, user.encryptedPassword) === false) {
      errors.password = 'Password is incorrect';
      return res.status(400).json(errors);
    }

    // if User Matched! 
    // create JWT Payload.......
    const payload = {
      id: user.id,
      username: user.username,
      avatar: user.avatar
    }

    // Sign Token
    jwt.sign(payload, keys, {
        expiresIn: 10800
    },
      (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      }
    );
  } catch (error) {
    next(error)
  }
};



// @route   GET api/users/current
// @desc    Return current user
// @access  Private

exports.getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar,
    cover: req.user.cover,
    description: req.user.description
  });
}