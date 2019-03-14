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
      email: req.body.email
    },
    (err, userFromDb) => {

      if (err) {
        res.status(500).json({
          success: false,
          msg: "Registration Error"
        });
        return;
      }
      // If the email is not taken, the "userFromDb" variable will empty.
      if (userFromDb) {
        errors.email = 'Email already exists';
        res.status(400).json(errors);
        return;
      }
      // If we get here, we are ready to save the new user in the DB.
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

      // const avatar = gravatar.url(req.body.email, {
      //   s: '200', // Size
      //   r: 'pg', // Rating
      //   d: 'mm' // Default
      // });

      const theUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        encryptedPassword: scrambledPassword,
        // avatar,
      });



      theUser.save((err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'System not created an account.',
            error: err
          });
          return;
        }
        // Clear the encryptedPassword before sending
        // (not from the database, just from the object)
        theUser.encryptedPassword = undefined;

        // Send the user's information to the frontend
        res.status(200).json(theUser);

      }); // close theUser.save()
    }
  )

}


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


  UserModel.findOne({
      email: email
    },
    (err, userFromDb) => {
      if (err) {
        next(err);
        return res.status(500).json(err);
      }

      if (!userFromDb) {
        errors.email = 'User not found';
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
        username: userFromDb.username
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
    }
  ); // close UserModel.findOne()
}



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