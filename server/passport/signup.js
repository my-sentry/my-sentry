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
          return users.addUser(
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            req.body.password
          );
        })
        .then(id => {
          return users.getUserById(id);
        })
        .then(newUser => {
          done(null, newUser);
        })
        .catch(err => {
          console.log('Signup Error: ', err);
          done(err);
        });
    });
  }));
};
