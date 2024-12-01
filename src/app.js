const express = require("express");
const app = express();
const PORT = 3000;

app.get("/user/:userID/:name/:password", (req, res) => {
  const value = req.params;
  console.log(value);
  
  res.send({
    firstname: "1212",
    lastname: "veera",
    value
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
