const mongoose = require('mongoose');

const workstationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true }, // Cost to allocate work
  isAvailable: { type: Boolean, default: true }, // Availability status
  workAssigned: { type: Number, default: 0 }, // Number of works assigned
});

const Workstation = mongoose.model('Workstation', workstationSchema);

module.exports = Workstation;
