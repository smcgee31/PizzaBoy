// EXTERNAL MODULES //
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('express-session');
const mongoose   = require('mongoose');

// CONFIG //
const config     = require('./config');

// CONTROLLERS //
const UserCtrl   = require('./controllers/UserCtrl');
const newShiftCtrl = require('./controllers/ShiftCtrl');

// SERVICES //
const passport   = require('./services/passport');


// POLICIES //
const isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// EXPRESS //
const app = express();

app.use(express.static(__dirname + './../public'));
// app.use(favicon(__dirname + './../public/img/favicon.ico'));
app.use(bodyParser.json());

// Session and passport
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

// User Endpoints
app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/user/:_id', isAuthed, UserCtrl.update);

// Other Endpoints
app.post('/newShift/:id', ShiftCtrl.submitTrip);

// CONNECTIONS //
const mongoURI = config.MONGO_URI;
const port     = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
