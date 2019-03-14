const express = require("express");
const passport = require("passport");
const ThreadController = require('../controllers/thread');
const router = express.Router();



// api/v1/threads/ALL => GET
router.get('/', ThreadController.getAllThreads);

// api/v1/threads => POST
router.post('/', passport.authenticate('jwt', {
  session: false
}), ThreadController.postThread);




module.exports = router;