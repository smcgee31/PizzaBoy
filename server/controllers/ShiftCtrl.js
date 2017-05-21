const User = require('../models/UserModel');
const Shift = require('../models/ShiftModel');

module.exports = {

  submitTrip: function(req, res, next) {
    const newTrip = new Shift(req.body);


  }

};