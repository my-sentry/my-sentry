var knex = require('../db.js');
var bcrypt = require('bcrypt-nodejs');

//Hash Password
var hashPassword = function (password) {
  return Promise((fulfill, reject) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      fulfill(hash);
    });
  });
};
//Add user
exports.addUser = function (firstName, lastName, username, password) {
  return hashPassword(password)
    .then(hash => {
      return knex('users')
        .returning(['id', 'first_name', 'last_name', 'username'])
        .insert({
          'first_name': firstName,
          'last_name': lastName,
          'username': username,
          'password': hash
        })
        .then(result => result[0]);
    });
};
//Get user
//Get users
