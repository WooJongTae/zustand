const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/commentSave", async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    Comment.find({ _id: comment._id })
      .populate({ path: "writer", select: "-password" })
      .then((data) => {
        return res.json({ success: true, data });
      });
  } catch (error) {
    next(error);
  }
});

router.post("/getComments", async (req, res, next) => {
  try {
    Comment.find({ movieId: req.body.movieId })
      .populate({ path: "writer", select: "-password" })
      .then((data) => {
        return res.json({ success: true, data });
      });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
