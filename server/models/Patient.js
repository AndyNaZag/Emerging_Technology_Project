const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
  },
  temperature: {
    type: Number,
  },
  heartRate: {
    type: Number,
  },
  bloodPressure: {
    type: String,
  },
  weight: {
    type: Number,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
