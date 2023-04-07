const mongoose = require("mongoose");

const EmergencyAlertSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("EmergencyAlert", EmergencyAlertSchema);
