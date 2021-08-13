const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    playlistName: { type: String, required: true },
    description: { type: String },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = { Playlist };
