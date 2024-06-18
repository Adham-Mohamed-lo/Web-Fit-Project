const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  workoutname: {
    type: string,
    required: true,
    unique: true,
  },
  workoutdescription: {
    type: string,
    required: true,
    unique: true,
  },
  workoutgif: {
    type: string,
    required: true,
    unique: true,
  },
  // Add more fields as needed

});

const User = mongoose.model("workout", workoutSchema);
