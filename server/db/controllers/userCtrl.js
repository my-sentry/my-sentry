var knex = require('../db.js');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');

// hash Password
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

// compare Passwords
exports.comparePassword = function (attempted, correct) {
  return new Promise((fulfill, reject) => {
    bcrypt.compare(attempted, correct, (err, res) => {
      if (err) {
        return reject(err);
      }

      fulfill(res);
    });
  });
};

// add user
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

// get user
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

// get users
exports.getUsers = function () {
  return knex.select()
    .from('users')
    .then(result => {
      return result.map(user => {
        return _.pick(user, ['id', 'first_name', 'last_name', 'username']);
      });
    });
};

// update user
exports.updateUserById = function(id, update) {
  return knex('users')
    .where('id', id)
    .update(update);
};

// delete user
exports.deleteUserById = function(id) {
  return knex('users')
    .where('id', id)
    .del();
};

// update user pushie token
exports.updateUserToken = function(userId, token) {
  return knex('users')
    .where('id', userId)
    .update({ token: token });
};
