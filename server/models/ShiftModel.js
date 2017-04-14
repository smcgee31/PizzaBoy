var mongoose = require('mongoose');
var objectId  = mongoose.Schema.Types.ObjectId;

var Tips = new mongoose.Schema({
    tipAmount: { type: Number, required: true }
  , tipType: { type: String, required: true }
});

var Shift = new mongoose.Schema({
    startMileage: { type: Number, index: true, required: true }
  , tips: [Tips]
  , user: { type: objectId, ref: 'User' }
});

module.exports = mongoose.model('Shift', Shift);