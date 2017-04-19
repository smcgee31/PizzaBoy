var mongoose = require('mongoose');
require('mongoose-type-email')
var bcrypt = require('bcryptjs');
var objectId  = mongoose.Schema.Types.ObjectId;

var User = new mongoose.Schema({
    name: { type: String }
  , username: { type: String }
  , email: { type: mongoose.SchemaTypes.Email, index: true, trim: true }
  , password: { type: String }
  , shift: [
    { type: objectId, ref: 'Shift'}
  ]
});

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User);
