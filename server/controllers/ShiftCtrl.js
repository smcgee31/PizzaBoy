const Shift = require('../models/ShiftModel');
const Trip = require('../models/TripsModel');
const User = require('../models/UserModel');

module.exports = {

  createNewShift: function(req, res, next) {
    const newShift = new Shift(req.body);
    newShift.save((error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        User.findByIdAndUpdate(req.params.id, {$push:{shifts: response._id}}, (err, resp) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(resp)
          }
        });

      }
    });
  },

  createTrip: function(req, res, next) {
    const trip = new Trip(req.body);
    trip.save((error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        Shift.findByIdAndUpdate(req.params.id, {$push:{trips: response._id}}, (err, resp) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(resp);
          }
        });
      }
    });
  },

  readCurrentShift: function(req, res, next) {
    User.findOne(req.params.id, (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    });
  }



};
