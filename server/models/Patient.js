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

  // Sympthons
  fever:{
    type: Boolean
  },
  cough:{
    type: Boolean
  },
  shortnessOfBreath:{
    type: Boolean
  },
  fatigue:{
    type: Boolean
  },
  bodyAches:{
    type: Boolean
  },
  headache:{
    type: Boolean
  },
  lossOfTaste:{
    type: Boolean
  },
  lossOfSmell:{
    type: Boolean
  },
  soreThroat:{
    type: Boolean
  },
  congestion:{
    type: Boolean
  },
  nausea:{
    type: Boolean
  },
  diarrhea:{
    type: Boolean
  }
 
});

module.exports = mongoose.model("Patient", PatientSchema);
