const mongoose = require("mongoose")

async function initializeDBConnection() {
  // Connecting to DB
  try{
    await mongoose.connect("mongodb+srv://KnackOfAbhinav:Abhinav2506@universe.stqwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => console.log("successfully connected"))

  } catch (err){
    console.error("mongoose connection failed...", error)
  }
}

module.exports = { initializeDBConnection }

