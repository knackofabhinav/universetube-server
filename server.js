const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Abhinav Patel")
})

const PORT = 3000

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));