const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.post("/", async (req, res) => {
  const { userId, videoId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.watchLater.find((id) => id == videoId)) {
      return res.json({ success: false, message: "Video already exists" });
    }
    user.watchLater.push(videoId);
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
