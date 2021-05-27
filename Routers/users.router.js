const express = require("express");
const { extend } = require("lodash");
const videolisting = require("../db/videolisting.js");
const { User } = require("../models/user.model.js");
const router = express.Router();

router.use(express.json());
router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser.password === password) {
      foundUser.password = undefined;
      res.json({ success: true, user: foundUser });
    } else {
      res.status(401).json({ success: false, message: "Incorrect Password" });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});

router.route("/signup").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      const NewUser = new User({ username, password });
      const savedUser = await NewUser.save();
      return res.json({ success: true, savedUser });
    }
    res.json({ success: false, message: "user already exist" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ success: false, errMessage: err });
  }
});

module.exports = router;
