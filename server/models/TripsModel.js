const mongoose = require('mongoose');
const objectId  = mongoose.Schema.Types.ObjectId;

const Trip = new mongoose.Schema({
    tripNumber: { type: Number, required: true }
  , tipAmount: { type: Number, required: true }
  , tipType: { type: String, required: true }
  , shift: { type: objectId, ref: 'Shift' }
});

module.exports = mongoose.model('Trip', Trip);