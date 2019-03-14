const express = require("express");
const passport = require("passport");
const UserController = require('../controllers/user');
const router = express.Router();



// api/u/update/avatar => POST
router.post('/update/avatar', passport.authenticate('jwt', {
  session: false
}), UserController.upload.avatarParser.single('avatar'), UserController.updateUserAvatar);

// api/u/update/cover => POST
router.post('/update/cover', passport.authenticate('jwt', {
  session: false
}), UserController.upload.coverParser.single('cover'), UserController.updateUserCover);

// api/u/update/bio => POST
router.post('/update/bio', passport.authenticate('jwt', {
  session: false
}), UserController.updateUserDescription);

// api/u/update/passreset => POST
router.post('/update/passreset', passport.authenticate('jwt', {
  session: false
}), UserController.updateUserPassword);

// api/u/remove => DELETE
router.delete('/remove', passport.authenticate('jwt', {
  session: false
}), UserController.removeUser);







module.exports = router;