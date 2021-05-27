const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Watch Later");
});

module.exports = router;
