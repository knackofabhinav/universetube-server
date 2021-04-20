const express = require("express");
const videolisting = require("../db/videolisting.js");
const router = express.Router();

router.use(express.json());

// router
//   .route("/")
//   .get((req, res) => {
//     const likedVideosIds = user[0].liked;
//     const likedVideos = videolisting.filter((video) =>
//       likedVideosIds.includes(video.id)
//     );
//     res.json(likedVideos);
//   })
//   .post((req, res) => {
//     const newVideo = req.body;
//     const newLikedArr = user[0].liked.push(newVideo);
//     res.json({ success: true, newLikedArr });
//   });

module.exports = router;
