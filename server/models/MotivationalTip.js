const mongoose = require('mongoose');

const MotivationalTipSchema = new mongoose.Schema({
  tip: {
    type: String,
    required: true
  },
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse'
  }
});

module.exports = mongoose.model('MotivationalTip', MotivationalTipSchema);
