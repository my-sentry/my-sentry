var LocalStrategy = require('passport-local').Strategy;
var users = require('../db/controllers/userCtrl.js');

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      users.getUser(username)
        .then(user => {
          if (user) {
            return done(null, false);
          }

          return users.insertUser(req.body);
        })
        .catch(err => {
          console.log('Signup Error: ', err);
          done(err);
        });
    });
  }));
};
