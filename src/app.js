const express = require("express");
const app = express();
const PORT = 3000;

app.use("/test",(req, res) => {
  res.send("Hello from express");
});

app.use("/hello",(req, res) => {
    res.send("Hello Hello hellooooooooo");
});
  

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
