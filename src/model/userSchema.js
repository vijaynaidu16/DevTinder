const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  emailId: {
    type: String,
  },

  password: {
    type: String,
  },

  age: {
    type: String,
    required: false, // Make it optional
  },
  gender: {
    type: String,
    required: false, // Make it optional
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = {userModel};