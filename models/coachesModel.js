const mongoose = require("mongoose");

const coachesSchema = new mongoose.Schema({
  coachname: {
    type: String,
    required: true,
    unique: true,
  },
  coachdescription: {
    type: String,
    required: true,
    unique: true,
  },
  // Add more fields as needed
});

const User = mongoose.model("coach", coachesSchema);
