'use strict';

const express = require('express');
const router = express.Router();

// TODO: create/understand errorHandlers
const { catchErrors } = require('../handlers/errorHandlers');

const UserCtrl = require('../controllers/UserCtrl');
const ShiftCtrl = require('../controllers/ShiftCtrl');

const isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }

  return next();
};

router.post('/register', UserCtrl.register);
router.get('/user', UserCtrl.read);
router.get('/me', isAuthed, UserCtrl.me);
router.put('/user/:_id', isAuthed, UserCtrl.update);

// TODO: since we wrapped the endpoints in an errorHandler you need to implement async/await
router.post('/newShift/:id', catchErrors(ShiftCtrl.createNewShift));
router.put('/addTrips/:id', catchErrors(ShiftCtrl.createTrip));
router.get('/addTrips/getShifts/:id', catchErrors(ShiftCtrl.getUsersShifts));

module.exports = router;
