const express = require("express");
const { connectDB } = require("./config/database");
const { userModel } = require("./model/userSchema");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send(`User added successfully`);
  } catch (err) {
    res.status(500).send("ERROR: " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not present");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentails");
    }
    // Create a token
    // Add the token to cookie and the reponse back to the user
    const token = await jwt.sign({ _id: user._id }, "secret");
    // console.log(token);
    res.cookie("token", token);
    res.send("Password is correct");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user.firstName);
    res.status(200).send(user.firstName + " sent the connection request");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/logout", userAuth, (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).send("Logout unsucessfull" + error.message);
  }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await userModel.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    }
    // res.send(users).status(200);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.get("/getid", async (req, res) => {
  const userId = req.query.userId; // Use query parameter for GET request
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send("not found");
    }
    res.send("found the id");
  } catch (error) {
    res.status(404).send("Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users).status(200);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete(userId);
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(404);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    await userModel.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
      returnDocuement: "after",
    });
    res.status(200).send("Patched the data");
  } catch (error) {
    res.status(404).send("something went wrong: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB established & connected");
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB is not connected");
  });
