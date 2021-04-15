const express = require("express")
const cors = require("cors")
const videolisting = require("./Routers/videolisting.router.js")
const app = express()
app.use(cors())
app.use("/videolisting", videolisting)


const PORT = 3000

app.listen(PORT, 
	() => console.log("Server is running on port...", PORT));