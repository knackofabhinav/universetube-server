const express = require("express")
const videolisting = require("../db/videolisting.js")
const router = express.Router()


router.route("/")
.get((req, res) => {
    res.json(videolisting)
})


module.exports = router