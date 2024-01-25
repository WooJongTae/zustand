const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 4000;
const mongoose = require("mongoose");

app.use(express.static(__dirname + "../images"));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_DATA)
  .then(() => {
    console.log("몽고DB 연동 성공!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/users", require("./routers/users"));

app.use("/comment", require("./routers/comment"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
