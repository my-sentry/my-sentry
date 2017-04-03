var login = require('./login');
var signup = require('./signup');

var users = require('../db/controllers/userCtrl.js');

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.getUserById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });

  login(passport);
  signup(passport);
};
