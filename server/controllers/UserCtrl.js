const User = require('../models/UserModel');

module.exports = {

  register(req, res) {
    User.create(req.body, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      const newUser = result.toObject();

      newUser.password = null;
      res.status(200).json(newUser);
    });
  },

  read(req, res) {
    User.find(req.query, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      for (let i = 0; i < result.length; i++) {
        delete result[i].password;
      }
      res.status(200).send(result);
    });
  },

  me(req, res) {
    if (!req.user) {
      return res.status(401).send('current user not defined');
    }
    req.user.password = null;

    return res.status(200).json(req.user);
  },

  update(req, res, next) {
    User.findByIdAndUpdate(req.params._id, req.body, function(err, result) { // eslint-disable-line no-underscore-dangle
      if (err) {
        return next(err);
      }
      res.status(200).send('user updated', result);
    });
  },
};
