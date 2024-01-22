const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/auth", auth, async (req, res, next) => {
  return res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

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

    if (!user) {
      return res.status(400).send("아이디가 없습니다.");
    }
    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send("비밀번호가 틀립니다.!");
    }
    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
