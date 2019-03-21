const bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// load user model
const User = require('../models/user-model');


// set cloudinary api settings
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// set folder settings and location in cloudinary
const avatarStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: process.env.CLOUD_AVATAR_FOLDER_NAME,
  allowedFormats: ['jpg', 'jpeg', 'jpe', 'png', 'gif'],
  tranformations: [{
    width: 32,
    height: 32,
    gravity: "face",
    radius: "max",
    crop: "crop"
  }]
});


const coverStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: process.env.CLOUD_COVER_FOLDER_NAME,
  allowedFormats: ['jpg', 'jpeg', 'jpe', 'png', 'gif'],
  transformation: [{
    width: 1600,
    height: 808,
    crop: "limit"
  }]
});


const avatarParser = multer({
  storage: avatarStorage,
  limits: { // file size set to 200kb
    fileSize: 1 * 200 * 200
  }
});

const coverParser = multer({
  storage: coverStorage,
  limits: { // file size set to 750kb
    fileSize: 1 * 750 * 750
  }
});

const uploadCover = multer().single('cover');

exports.upload = {
  avatarParser,
  coverParser
}


// @route   POST api/u/update/avatar
// @desc    Add/Update user avatar image
// @access  Private 
// (protected Route)
exports.updateUserAvatar = async (req, res) => {
  try {
    console.log(req.file) // see what is in file upload
    const image = {};
    image.url = req.file.url;
    image.secure_url = req.file.secure_url;
    image.public_id = req.file.public_id;
    image.version = req.file.version;
    image.originalname = req.file.originalname;


   let user = await User.findByPk(req.user.id);

   if(!user){
     res.status(400).json({message: 'User not found'});
     return;
   }else{
     await user.update({ avatar: image.secure_url });
     user.email = undefined;
     user.encryptedPassword = undefined;
     res.json(user.toJSON());
   }
  } catch (error) {
    next(error);
  }

};



// @route   POST api/u/update/cover
// @desc    Add/Update user cover image
// @access  Private 
// (protected Route)
exports.updateUserCover = async (req, res) => {
  try {
    console.log(req.file) // see what is in file upload
    const image = {};
    image.url = req.file.url;
    image.secure_url = req.file.secure_url;
    image.public_id = req.file.public_id;
    image.version = req.file.version;
    image.originalname = req.file.originalname;


    let user = await User.findByPk(req.user.id);

    if(!user){
      res.status(400).json({message: 'User not found'});
      return;
    }else{
      await user.update({ cover: image.secure_url });
      user.email = undefined;
      user.encryptedPassword = undefined;
      res.json(user.toJSON());
    }
  } catch (error) {
    next(error);
  }
};



// @route   POST api/settings/bio
// @desc    Update user's bio (description)
// @access  Private 
// (protected Route)
exports.updateUserDescription = async (req, res, next) => {
  try {

    let user = await User.findByPk(req.user.id);

    if(!user) {
      res.status(400).json({message: 'User Not Found'});
      return;
    } else {
      await user.update({ description: req.body.description });
      user.email = undefined;
      user.encryptedPassword = undefined;
      res.json(user.toJSON())
    }
  } catch (error) {
    next(error);
  }
};



// @route   POST api/u/update/passreset
// @desc    Reset user's password
// @access  Private 
// (protected Route)
exports.updateUserPassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const scrambledPassword = bcrypt.hashSync(newPassword, salt);

    let user = await User.findByPk(req.user.id);
    if(!user){
      res.status(400).json({message: 'User not found.'});
    }else{
      await user.update({
        encryptedPassword: scrambledPassword
      })
      res.json({ success: true })
    }   
  } catch (error) {
    next(error);
  }
};





// @route   DELETE api/settings/delete-account
// @desc    Delete user's account (Only account)
// @access  Private 
// (protected Route)
exports.removeUser = async (req, res) => {
  try {  
    let user = await User.findByPk(req.user.id);

    if(!user){
      res.status(400).json({message: 'User not found'});
      return;
    }else{
      await user.destroy();
      res.json({ success: true });
    }
  } catch (error) {
    next(error);
  }
};