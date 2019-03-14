const express = require("express");
const passport = require("passport");

const authController = require('../controllers/auth');

const router = express.Router();


// api/register => POST
router.post('/register', authController.getRegister);

// api/login => GET
router.post('/login', authController.getLogin);

// api/currentUser => GET
router.get('/currentUser', passport.authenticate('jwt', {
  session: false
}), authController.getCurrentUser);


module.exports = router;