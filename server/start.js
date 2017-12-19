const mongoose = require('mongoose')

require('dotenv').config();

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error('> > >  E.R.R.O.R  < < <\n', err);
});

// import all of our models
require('./models/index')

// Start our app!
const app = require('./app');

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${ server.address().port }`);
});
