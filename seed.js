const Video = require("./models/video.model")
const videolisting = require("./db/videolisting")

const seedVideolisting = () => {
    videolisting.map(video => async(video) => {
        try{
            const savedVideo = await Video.create(video);
        } catch(err){
            console.log(err)
        }
    })
}

module.exports = { seedVideolisting }