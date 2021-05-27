const express = require("express");
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect");
const videos = require("./routers/videos.router.js");
const users = require("./routers/users.router.js");
const playlists = require("./routers/playlists.router");
const watchlater = require("./routers/watchlater.router.js");
const history = require("./routers/history.router.js");
const liked = require("./routers/liked.router.js");
const isAuthenticated = require("./middleware/isAuthenticated");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// called before any route handler
initializeDBConnection();

app.use("/", users);
app.use("/videos", videos);
app.use("/watchlater", watchlater);
app.use("/playlists", playlists);
app.use("/history", history);
app.use("/liked", liked);

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({
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
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(process.env.PORT || port, () =>
  console.log("Server is running on port...", port)
);
