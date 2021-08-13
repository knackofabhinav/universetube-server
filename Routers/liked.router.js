const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const { videoId } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (user.likedVideos.find((video) => video._id == videoId)) {
      return res.json({ success: false, message: "Video already exists" });
    }
    if (!!videoId) {
      user.likedVideos.push(videoId);
      await user.save();
      const updatedUser = await User.findById(userId).populate("likedVideos");
      return res.json({ success: true, likedVideos: updatedUser.likedVideos });
    }
    res.json({
      success: false,
      message: "you need to put valid video id to add in liked.",
    });
  } catch (err) {
    console.log(err);
  }
});
router.route("/:videoId").delete(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (user.likedVideos.some((id) => id.toString() === videoId)) {
      user.likedVideos.remove({ _id: videoId });
      await user.save();
      const updatedUser = await User.findById(userId).populate("likedVideos");
      return res.json({ success: true, likedVideos: updatedUser.likedVideos });
    } else {
      res
        .status(404)
        .json({ success: false, message: "video doesn't exist in liked" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
