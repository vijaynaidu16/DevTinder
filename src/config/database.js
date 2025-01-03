const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vijaynaidu095:n7o4WJ9gBtzNQGYb@namastenode.0tboz.mongodb.net/"
  )
};

module.exports = {connectDB}
