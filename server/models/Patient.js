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
  gender: {
    type: String,
  },
  age: {
    type: Number,
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
  motivationalTip: {
    type: String,
  },
  alertMsg: {
    type: String,
  },
  fever: {
    type: Boolean,
  },
  chestPain: {
    type: Boolean,
  },
  difficultyBreathing: {
    type: Boolean,
  },
  symptoms: {
    type: String,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
