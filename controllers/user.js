const bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// load model
const User = require('../models/user-model');
const Thread = require('../models/thread-model');
const Post = require('../models/post-model');
const Category = require('../models/category-model');


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
  limits: { // file size set to 750kb
    fileSize: 1 * 750 * 750
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
  coverParser,
}


// @route   GET api/u/:username
// @desc    Get User data by username params
// @access  Public
// (public route)
exports.getUser = async (req, res, next) => {
  try {
    // const { pageNum } = req.body;
    // const pageNum = 1;
    const paginate = ({ page, pageSize }) => {
    const offset = page * pageSize;
    const limit = offset + pageSize;

    return {
        offset,
        limit
    };
  };

  let page = 0;
  let pageSize = 6;

    let user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [
        {
          model: Thread,
          // offset: 0, limit: 5,
          // offset: page, limit: pageSize,
          ...paginate({page, pageSize}),
          order: [
              ['id', 'DESC']
            ], 
            include: [
            {
              model: User,
              attributes: ['username']
            },
            {
              model: Category,
              attributes: ['id', 'name', 'value', 'color']
            },
            {
              model: Post, attributes: ['userId', 'replyingToUsername', 'content'],
              order: [
                ['id', 'DESC']
              ], 
              include:[
               {
                 model: User, 
                 attributes: ['username', 'id', 'avatar']
               } 
              ]
            }
          ]
        },
      ],
    });

    if(!user) {
      return res.status(400).json({userNotFound: 'User Not Found'});
    } else {
      user.encryptedPassword = undefined;
      paginate({page, pageSize});
      return res.json({
        success: true,
        user,
        page,
        pageSize
      })
    }

  } catch (error) {
    next(error);
  }
}





// @route   POST api/u/update/avatar
// @desc    Add/Update user avatar image
// @access  Private 
// (protected Route)
exports.updateUserAvatar = async (req, res, next) => {
  try {
    console.log(req.file) // see what is in file upload
    // const image = {};
    // image.url = req.file.url;
    // image.secure_url = req.file.secure_url;
    // image.public_id = req.file.public_id;
    // image.version = req.file.version;
    // image.originalname = req.file.originalname;


   let user = await User.findByPk(req.user.id);

   if(!user){
     res.status(400).json({message: 'User not found'});
     return;
   }else{
     await user.update({
       avatar: req.file.secure_url
     });
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
exports.updateUserCover = async (req, res, next) => {
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
exports.updateUserPassword = async (req, res, next) => {
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




// exports.updateUserProfile = async (req, res, next) => {
//   try {
//     let user = await User.findByPk(req.user.id);

//     console.log(req.files);
//     const { description } = req.body

//     if (!user) {
//      return res.status(400).json({message: 'User Not Found'});
//     } 

//     await user.update({
//       description : description,
//       avatar: req.files.avatar[0].secure_url,
//       cover: req.files.cover[0].secure_url
//     })
//     res.json({
//       uploadedAvatar: req.files.avatar[0].secure_url,
//       uploadedCover: req.files.cover[0].secure_url,
//       description : user.description
//     });

//   } catch (error) {
//     next(error);
//   }
// }