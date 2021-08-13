const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const { videoId } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (user.watchLater.find((video) => video._id == videoId)) {
      return res
        .status(409)
        .json({ success: false, message: "Video already exists" });
    }
    if (!!videoId) {
      user.watchLater.push(videoId);
      await user.save();
      const updatedUser = await User.findById(userId).populate("watchLater");
      return res.json({ success: true, watchLater: updatedUser.watchLater });
    }
    res.json({
      success: false,
      message: "you need to put valid video id to add in watch later.",
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
    if (user.watchLater.some((id) => id.toString() === videoId)) {
      user.watchLater.remove({ _id: videoId });
      await user.save();
      const updatedUser = await User.findById(userId).populate("watchLater");
      return res.json({ success: true, watchLater: updatedUser.watchLater });
    } else {
      console.log(err);
      res.status(404).json({ success: false, message: "Video Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
