const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {
      type: String,
      required: true
    },
    avatar: [{
      url: {
        type: String
      },
      secure_url: {
        type: String
      },
      public_id: {
        type: String
      },
      version: {
        type: String
      },
      originalName: {
        type: String
      }
    }],
    cover: [{
      url: {
        type: String
      },
      secure_url: {
        type: String
      },
      public_id: {
        type: String
      },
      version: {
        type: String
      },
      originalName: {
        type: String
      }
    }],
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;