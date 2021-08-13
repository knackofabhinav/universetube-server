const express = require("express");
const jwt = require("jsonwebtoken");
const videolisting = require("../db/videolisting.js");
const { User } = require("../models/user.model.js");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username })
      .populate("likedVideos")
      .populate("history")
      .populate("watchLater")
      .populate({ path: "playlists", populate: { path: "videos" } });
    if (foundUser) {
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if (validPassword) {
        const authToken = jwt.sign(
          JSON.stringify(foundUser._id),
          process.env.SECRET_TOKEN
        );
        foundUser.password = undefined;
        res.json({ success: true, authToken, user: foundUser });
      } else {
        res.status(400).json({ success: false, message: "Invalid Password" });
      }
    } else {
      res.status(401).json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
});

router.route("/signup").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid username or password" });
    }
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      const user = new User({ username, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const savedUser = await user.save();
      const authToken = jwt.sign(
        JSON.stringify(user._id),
        process.env.SECRET_TOKEN
      );
      savedUser.password = undefined;
      return res.json({ success: true, authToken, savedUser });
    }
    res.status(409).json({ success: false, message: "user already exist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, errMessage: err });
  }
});

module.exports = router;
