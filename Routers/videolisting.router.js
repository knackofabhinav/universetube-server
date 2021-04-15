const express = require("express")
const videolisting = require("../db/videolisting.js")
const router = express.Router()

router.get("/", (req, res) => {
    console.log("HI")
    console.log(videolisting)
    res.json(videolisting)
})

module.exports = router