const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

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
    const isMatch = await user.comparePassword(req.body.password);
    console.log(isMatch);

    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KET);
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
