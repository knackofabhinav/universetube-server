const express = require("express");
const router = express.Router();

router.post("/history", async (req, res) => {
  const { userId, videoId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.history.find((id) => id == videoId)) {
      res.json({ success: false, message: "Video already exists" });
    }
    user.history.push(videoId);
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
