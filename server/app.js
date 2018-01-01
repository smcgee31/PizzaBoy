'use strict';

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passport = require('./services/passport');

// CONTROLLERS //
const UserCtrl = require('./controllers/UserCtrl');
const ShiftCtrl = require('./controllers/ShiftCtrl');

// POLICIES //
const isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }

  return next();
};

// EXPRESS //
const app = express();

app.use(express.static(`${ __dirname }./../public`));
// app.use(favicon(__dirname + './../public/img/favicon.ico'));
app.use(bodyParser.json());

// Session and passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me',
}));
app.get('/logout', function(req, res) {
  req.logout();

  return res.status(200).send('logged out');
});

// User Endpoints
app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/user/:_id', isAuthed, UserCtrl.update);

// Other Endpoints
app.post('/newShift/:id', ShiftCtrl.createNewShift);
app.put('/addTrips/:id', ShiftCtrl.createTrip);
app.get('/addTrips/getShifts/:id', ShiftCtrl.getUsersShifts);

module.exports = app;
