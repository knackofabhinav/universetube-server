const express = require("express");
const { Video } = require("../models/video.model");
const router = express.Router();
const { extend } = require("lodash");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json({ videos: videos, success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const video = req.body;
      const NewVideo = new Video(video);
      const savedVideo = await NewVideo.save();
      res.json({ success: true, video: savedVideo });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to add video",
        errorMessage: err.message,
      });
    }
  });

router.param("videoId", async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    req.video = video;
    next();
  } catch {
    res.status(400).json({ success: false, message: "Couldn't Retrive Video" });
  }
});

router
  .route("/:videoId")
  .get((req, res) => {
    const { video } = req;
    video.__v = undefined;
    res.json({ success: true, video });
  })
  .post((req, res) => {
    const updateVideo = req.body;
    let { video } = req;
    video = extend(video, updateVideo);
    video.save();
    res.json({ success: true, video });
  });

module.exports = router;
