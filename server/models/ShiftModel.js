const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const Shift = new mongoose.Schema({
  shiftId: { type: String, required: true },
  startMileage: { type: Number },
  endMileage: { type: Number },
  trips: [ { type: objectId, ref: 'Trip' } ],
  user: { type: objectId, ref: 'User' },
});

module.exports = mongoose.model('Shift', Shift);
