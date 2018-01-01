const mongoose = require('mongoose');

require('mongoose-type-email');
const bcrypt = require('bcryptjs');
const objectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: mongoose.SchemaTypes.Email, index: true, trim: true },
  password: { type: String },
  shifts: [ { type: objectId, ref: 'Shift' } ],
});

User.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  const user = this;

  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User);
