const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: "User Already Exists. Please Login",
    },
    password: { type: String, required: true },
    likedVideos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Video", unique: true },
    ],
    history: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Video", unique: true },
    ],
    watchLater: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Video", unique: true },
    ],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
