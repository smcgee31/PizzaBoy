var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var objectId  = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    name: { type: String }
  , username: { type: String }
  , email: { type: String, index: true, trim: true }
  , password: { type: String }
  , tips: [
    { type: objectId, ref: 'Tip'}
  ]
});

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);
