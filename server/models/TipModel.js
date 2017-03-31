var mongoose = require('mongoose');
var objectId  = mongoose.Schema.Types.ObjectId;

var tipSchema = new mongoose.Schema({
    tripNumber: { type: Number, index: true, required: true }
  , tipAmount: { type: Number, required: true }
  , tipType: { type: String, required: true }
  , user: { type: objectId, ref: 'User' }
});

module.exports = mongoose.model('Tip', tipSchema);