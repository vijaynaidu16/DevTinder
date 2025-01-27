const mongoose = require("mongoose");

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
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is invalid");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkE1LSJXHRCOSWyn1wFq8RhGSO8_geSROkA&s",
    },

    about: {
      type: String,
      default: "This is about the user",
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
