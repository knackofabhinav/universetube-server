const mongoose = require("mongoose");
require("mongoose-type-url");

const VideoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    channel: { type: String, required: true },
    views: { type: String, required: true },
    likes: { type: String, require: true },
    dislikes: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    url: { type: mongoose.SchemaTypes.Url, required: true },
    thumbnail: { type: mongoose.SchemaTypes.Url, required: true },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
