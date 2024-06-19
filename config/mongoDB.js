const mongoose = require("mongoose");

function connectToMongoDB() {
  return mongoose
    .connect(process.env.MONGODB_URI, {
      //bygybo warning no need for them

      //useNewUrlParser: true,    
      //useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected")

    })
    .catch((err) => {
      console.error("MongoDB connection error:", err)
    });
}

module.exports = { connectToMongoDB };
