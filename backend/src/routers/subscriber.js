const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

router.post("/subscribeNumber", async (req, res, next) => {
  try {
    const subscribeNumber = await Subscriber.find({
      movieId: req.body.movieId,
    });
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribeNumber.length });
  } catch (error) {
    next(error);
  }
});

router.post("/subscribed", async (req, res, next) => {
  try {
    const subscribed = await Subscriber.find({
      movieId: req.body.movieId,
      userForm: req.body.userForm,
    });
    let result = false;
    if (subscribed.length !== 0) {
      result = true;
    }
    return res.status(200).json({ success: true, subscribed: result });
  } catch (error) {
    next(error);
  }
});

router.post("/unSubscribedData", async (req, res, next) => {
  try {
    console.log("111111", req.body);
    const unSubscribedData = await Subscriber.findOneAndDelete({
      movieId: req.body.movieId,
      userForm: req.body.userForm,
    });
    return res.status(200).json({ success: true, unSubscribedData });
  } catch (error) {
    next(error);
  }
});

router.post("/SubscribedData", async (req, res, next) => {
  try {
    console.log("111111", req.body);
    const SubscribedData = new Subscriber(req.body);
    await SubscribedData.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
module.exports = router;

router.post("/recommendData", async (req, res, next) => {
  try {
    console.log(req.body);
    const movieData = await Subscriber.find({ userForm: req.body.id });
    console.log(movieData);
    return res.status(200).json({ success: true, movieData });
  } catch (error) {
    next(error);
  }
});
