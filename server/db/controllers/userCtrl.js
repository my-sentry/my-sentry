var knex = require('../db.js');
var bcrypt = require('bcrypt-nodejs');

//Hash Password
var hashPassword = function (password) {
  return new Promise((fulfill, reject) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      fulfill(hash);
    });
  });
};

//Compare Passwords
exports.comparePassword = function (attempted, correct) {
  return new Promise((fullfill, reject) => {
    bcrypt.compare(attempted, correct, (err, res) => {
      if (err) {
        return reject(err);
      }

      fulfill(res);
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
exports.getUser = function (username) {
  return knex('users')
    .where('username', username)
    .then(result => {
      return result[0];
    });
};

exports.getUserById = function (id) {
  return knex('users')
    .where('id', id)
    .then(result => {
      return _.pick(result[0], ['id', 'first_name', 'last_name', 'username']);
    });
};

//Get users
exports.getUsers = function () {
  return knex.select()
    .from('users')
    .then(result => {
      return result.map(user => {
        return _.pick(user, ['id', 'first_name', 'last_name', 'username']);
      });
    });
};

//Update user
exports.updateUserById = function(id) {
  return knex('users')
    .where('id', id)
    .then(result => {
      return _.pick(result[0], ['id', 'first_name', 'last_name', 'username']);
    });
};

//Delete user
exports.deleteUserById = function(id) {
  return knex('users')
    .where('id', id)
    .del();
};
