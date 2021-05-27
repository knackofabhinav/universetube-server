const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");

router.use(express.json());

router
  .route("/")

  // CREATING NEW PLAYLIST
  .post(async (req, res) => {
    const { userId, name } = req.body;
    try {
      const user = await User.findById(userId);
      const newPlaylist = new Playlist({ name });
      await newPlaylist.save();
      user.playlists.push(newPlaylist._id);
      await user.save();
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/:playlistId")
  .get(async (req, res) => {
    const { playlistId } = req.params;
    try {
      const playlist = await Playlist.findById(playlistId);
      res.json({ playlist });
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    const { playlistId } = req.params;
    const { videoId } = req.body;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.videos.find((id) => id == videoId)) {
        return res.json({ success: false, message: "video already exists" });
      }
      console.log(playlist);
      playlist.videos.push(videoId);
      await playlist.save();
      res.json({ success: true, playlist });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
