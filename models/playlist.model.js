const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        unique: "Video Already Exist in Playlist",
      },
    ],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = { Playlist };
