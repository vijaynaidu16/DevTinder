const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },

    lastName: {
      type: String,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email " + value);
        }
      }
      
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if(!validator.isStrongPassword(value)){
          throw new Error("Invalid password (Not strong): " + value)
        }
      }
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender" + value);
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkE1LSJXHRCOSWyn1wFq8RhGSO8_geSROkA&s",
        validate(value) {
          if(!validator.isURL(value)){
            throw new Error("Invalid URL " + value);
          }
        }
    },

    about: {
      type: String,
      default: "This is about the user",
    },

    skills: {
      type: [String],
      minLength: 2
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
