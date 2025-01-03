const express = require("express");
const { connectDB } = require("./config/database");
const { userModel } = require("./model/userSchema");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    const user = new userModel(userData);
    await user.save();
    res.send(`User added successfully`);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user to the database");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);
  try {
    const users = await userModel.find({ emailId: userEmail });
    if(users.length === 0) res.send("user not found")
    res.send(users).status(200);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {

  try {
    const users = await userModel.find({});
    res.send(users).status(200);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
})

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
