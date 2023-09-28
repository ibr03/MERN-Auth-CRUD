const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "Your name is required"],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "Your age is required"],
  },
  medicalHistory: {
    type: String,
    required: [true, "Your medical history is required"],
  },
  lastVisit: {
    type: Date,
  },
});

module.exports = mongoose.model("Record", patientSchema);