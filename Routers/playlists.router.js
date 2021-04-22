const express = require("express");
const router = express.Router();

router.use(express.json());

router
.route("/")
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


module.exports = router;
