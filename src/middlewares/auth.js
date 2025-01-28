const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userSchema");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "secret");
    const { _id } = decodedMessage;
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};
module.exports = { userAuth };
