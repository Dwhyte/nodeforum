const bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// load user model
const UserModel = require('../models/user-model');


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


// @desc    Post - update user avatar image
// @access  Private
exports.updateUserAvatar = (req, res) => {
  console.log(req.file) // see what is in file upload
  const image = {};
  image.url = req.file.url;
  image.secure_url = req.file.secure_url;
  image.public_id = req.file.public_id;
  image.version = req.file.version;
  image.originalname = req.file.originalname;

  UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        avatar: {
          url: image.url,
          secure_url: image.secure_url,
          public_id: image.public_id,
          version: image.version,
          originalname: image.originalname
        }
      }
    },
    (err, userFromDb) => {
      if (err) {
        res.status(500).json({
          success: false,
          err
        });
      }
      res.status(200).json({success: true})
    }
  )
};


// @desc    Post - update user cover image
// @access  Private
exports.updateUserCover = (req, res) => {
  console.log(req.file) // see what is in file upload
  const image = {};
  image.url = req.file.url;
  image.secure_url = req.file.secure_url;
  image.public_id = req.file.public_id;
  image.version = req.file.version;
  image.originalname = req.file.originalname;

  UserModel.findByIdAndUpdate(
   req.user.id, 
    {
      $set: {
        cover: {
          url: image.url,
          secure_url: image.secure_url,
          public_id: image.public_id,
          version: image.version,
          originalname: image.originalname
        }
      }
    },
    (err, userFromDb) => {
      if (err) {
        res.status(500).json({
          success: false,
          err
        });
      }
      userFromDb.encryptedPassword = undefined;
      res.status(200).json({
        success: true,
        userFromDb
      })
    }
  )
};



// @route   POST api/settings/bio
// @desc    Update user's bio (description)
// @access  Private 
// (protected Route)
exports.updateUserDescription = (res, req) => {
  const { description } = req.body;
  const { id } = req.user.id;

  UserModel.findByIdAndUpdate(
    id,
    { description: description }
  )
    .then(user => res.json(user))
    .catch(err => {
      res.json(err)
    })
};


exports.updateUserPassword = (res, req) => {
  const salt = bcrypt.genSaltSync(10);
  const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

  UserModel.findByIdAndUpdate(
    req.user.id,
      {
        encryptedPassword: scrambledPassword
      },
      (err, userFromDb) => {
        if (err) {
          res.status(500).json({
            success: false,
            err
          });
        }
        res.status(200).json({
          success: true
        });
      }
  )
}





// @route   DELETE api/settings/delete-account
// @desc    Delete user's account and any saved listings under user's id
// @access  Private 
// (protected Route)