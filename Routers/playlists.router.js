const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");

router.use(express.json());

router
  .route("/")

  // CREATING NEW PLAYLIST
  .post(async (req, res) => {
    const { playlistName } = req.body;
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      const newPlaylist = new Playlist({ playlistName });
      await newPlaylist.save();
      user.playlists.push(newPlaylist._id);
      await user.save();
      const updatedUser = await User.findById(userId).populate("playlists");
      res.json({ success: true, playlists: updatedUser.playlists });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/:playlistId")
  .post(async (req, res) => {
    const { playlistId } = req.params;
    const { videoId } = req.body;
    const userId = req.userId;
    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist.videos.find((id) => id == videoId)) {
        return res
          .status(409)
          .json({ success: false, message: "video already exists" });
      }
      playlist.videos.push(videoId);
      await playlist.save();
      const updatedUser = await User.findById(userId).populate({
        path: "playlists",
        populate: { path: "videos" },
      });
      res.json({ success: true, playlists: updatedUser.playlists });
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    const { playlistId } = req.params;
    const userId = req.userId;
    try {
      await Playlist.findOneAndDelete(playlistId);
      const user = await User.findById(userId);
      user.playlists.remove({ _id: playlistId });
      user.save();
      const updatedUser = await User.findById(user).populate({
        path: "playlists",
        populate: { path: "videos" },
      });
      res.json({ success: true, playlists: updatedUser.playlists });
    } catch (err) {
      console.log(err);
    }
  });

router.route("/:playlistId/:videoId").delete(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const userId = req.userId;
  try {
    const playlist = await Playlist.findById(playlistId);
    playlist.videos.remove({ _id: videoId });
    playlist.save();
    const user = await User.findById(userId).populate({
      path: "playlists",
      populate: { path: "videos" },
    });
    res.json({ success: true, playlists: user.playlists });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
