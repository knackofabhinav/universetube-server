const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/").get(async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId)
      .populate("likedVideos")
      .populate("history")
      .populate("watchLater")
      .populate({ path: "playlists", populate: { path: "videos" } });
    user.password = undefined;
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
