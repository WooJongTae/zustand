const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// 여기 수정
router.post("/commentSave", async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    const data = await Comment.find({ _id: comment._id }).populate({
      path: "writer",
      select: "-password",
    });
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post("/getComments", async (req, res, next) => {
  try {
    const data = await Comment.find({ movieId: req.body.movieId }).populate({
      path: "writer",
      select: "-password",
    });
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
