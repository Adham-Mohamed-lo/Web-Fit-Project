const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  workoutname: {
    type: String,
    required: true,
    unique: true,
  },
  workoutdescription: {
    type: String,
    required: true,
    unique: true,
  },
  workoutgif: {
    type: String,
    required: true,
    unique: true,
  },
  // Add more fields as needed

});

const User = mongoose.model("workout", workoutSchema);
