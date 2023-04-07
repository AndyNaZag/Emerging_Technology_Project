const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse",
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
