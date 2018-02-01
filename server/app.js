'use strict';

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passport = require('./services/passport');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.use(express.static(`${ __dirname }./../public`));
// app.use(favicon(__dirname + './../public/img/favicon.ico'));
app.use(bodyParser.json());

// Session and Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me',
}));
app.get('/logout', function(req, res) {
  req.logout();

  return res.status(200).send('logged out');
});

app.use('/', routes);

// Handle Errors
//  -are they just validation errors
app.use(errorHandlers.flashValidationErrors);
//  -or are they developer errors
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
//  -if none of the above then they are production errors
app.use(errorHandlers.productionErrors);

module.exports = app;
