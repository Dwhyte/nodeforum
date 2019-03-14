const express = require("express");
const passport = require("passport");
const UserController = require('../controllers/user');
const router = express.Router();




router.post('/update/avatar', passport.authenticate('jwt', {
  session: false
}), UserController.upload.avatarParser.single('avatar'), UserController.updateUserAvatar);



router.post('/update/cover', passport.authenticate('jwt', {
  session: false
}), UserController.upload.coverParser.single('cover'), UserController.updateUserCover);


// router.post('/update/cover', passport.authenticate('jwt', {
//   session: false
// }), UserController.updateUserCover);







module.exports = router;