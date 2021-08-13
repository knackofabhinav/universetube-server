const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router
  .post("/", async (req, res) => {
    const { videoId } = req.body;
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      if (user.history.find((id) => id == videoId)) {
        return res.json({ success: false, message: "Video already exists" });
      }
      user.history.push(videoId);
      await user.save();
      const updatedUser = await User.findById(userId).populate("history");
      res.json({ success: true, history: updatedUser.history });
    } catch (err) {
      console.log(err);
    }
  })
  .delete("/", async (req, res) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      user.history = [];
      await user.save();
      res.json({ success: true, history: user.history });
    } catch (err) {
      console.error(error);
    }
  });

module.exports = router;
