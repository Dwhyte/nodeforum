const express = require("express");
const passport = require("passport");
const ThreadController = require('../controllers/thread');
const router = express.Router();



// api/v1/threads => GET
router.get('/', ThreadController.getAllThreads);

// api/v1/threads => POST
router.post('/', passport.authenticate('jwt', {
  session: false
}), ThreadController.postThread);


router.get('/:thread', ThreadController.getSingleThread);

router.delete('/:thread', passport.authenticate('jwt', {
  session: false
}), ThreadController.removeThread);



module.exports = router;