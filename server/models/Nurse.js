const mongoose = require("mongoose");

const NurseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Nurse", NurseSchema);
