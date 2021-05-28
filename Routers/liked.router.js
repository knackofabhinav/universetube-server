const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const { userId, videoId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.likedVideos.find((id) => id == videoId)) {
      return res.json({ success: false, message: "Video already exists" });
    }
    user.likedVideos.push(videoId);
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
  }
});
router.route("/:userId/:videoId").delete(async (req, res) => {
  const { userId, videoId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user.likedVideos.find((id) => id == videoId)) {
      user.likedVideos.remove({ _id: videoId });
      await user.save();
      return res.json({ success: true, likedVideos: user.likedVideos });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
