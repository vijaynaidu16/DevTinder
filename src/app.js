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
    res.status(500).send("Error adding user to the database" + err);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);
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
    await userModel.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
      returnDocuement: "after",
    });
    res.status(200).send("Patched the data");
  } catch (error) {
    res.status(404).send("something went wrong" + error.message);
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
