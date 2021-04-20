const express = require("express");
const cors = require("cors");
const videolisting = require("./routers/videolisting.router.js");
const { initializeDBConnection } = require("./db/db.connect");
const app = express();
app.use(cors());
app.use("/videolisting", videolisting);

const PORT = 3000;

// called before any route handler
initializeDBConnection();

app.get("/", (req, res) => {
  res.send("API For Video Library");
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: "route not found on server, please check",
    });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "error occured, see the errMessage key for more details",
      errorMessage: err.message,
    });
});

app.listen(PORT, () => console.log("Server is running on port...", PORT));
