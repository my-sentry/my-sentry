var LocalStrategy = require('passport-local');
var users = require('../db/controllers/userCtrl.js');

module.exports = function(passport) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log('Req body: ', req.body);
    users.getUser(username)
      .then(user => {
        if (!user) {
          return done(null, false);
        }

        return users.comparePassword(password, user.password)
          .then(match => {
            if (match) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
      })
      .catch(err => {
        console.log('Signup Error: ', err);
        done(err);
      });
  }));
};
