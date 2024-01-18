const express = require("express");
const router = express.Router();
const User = require("../models/User");
const comparePasswor = require("../models/User");

router.post("/register", async (req, res, next) => {
  try {
    console.log("요청", req.body);
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).send("아이디가 없습니다.");
    }
    const isMatch = await user.comparePasswor(req.body.password);
    console.log(isMatch);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
