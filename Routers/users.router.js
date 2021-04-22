const express = require("express");
const { extend } = require("lodash");
const videolisting = require("../db/videolisting.js");
const { User } = require("../models/user.model.js");
const router = express.Router();

router.use(express.json());

router
.route("/signin")
.get((req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = User.findOne({ username: username });
    if(foundUser.password === password){
        res.json({success: true, message: `This is ${username} Account`})
    } else {
        res.status(401).json({success:false, message:"Incorrect Password"})
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});

router
.route("/signup")
.post((req, res) => {
  const user = req.body;
  const {username} = user
  const userFound = User.findOne({username: username})
  if (userFound) {
    return res.json({success: false, message:"User already exist. Please Login"})
  } else{
    const newUser = new User(user)
    newUser.save()
    res.json({success: true, message:`New user ${username} created`})
  }
})

module.exports = router;
