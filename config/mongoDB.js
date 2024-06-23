const mongoose = require("mongoose");

function connectToMongoDB() {
  return mongoose
    .connect(process.env.MONGODB_URI, {
     
    })
    .then(() => {
      console.log("MongoDB connected")

    })
    .catch((err) => {
      console.error("MongoDB connection error:", err)
    });
}

module.exports = { connectToMongoDB };
