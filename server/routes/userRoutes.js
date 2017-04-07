var express = require('express');
var router = express.Router();
var users = require('../db/controllers/userCtrl');
var auth = require('../authHelper');
var _ = require('lodash');

module.exports = function(passport) {
  router.get('/', /*auth.isAuth, */(req, res, next) => {
    users.getUsers()
      .then(results => res.json(results))
      .catch(err => {
        console.log(err);
        next(err);
      });
  });

  router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    if (typeof id === 'string') {
      users.getUser(id)
        .then(result => res.json(result))
        .catch(err => {
          console.log(err);
          next(err);
        });
    } else {
      users.getUserById(id)
        .then(result => res.json(result))
        .catch(err => {
          console.log(err);
          next(err);
        });
    }
  });

  router.post(
    '/signup',
    passport.authenticate('signup'),
    (req, res, next) => {
      res.json(_.pick(req.user, ['id', 'username', 'first_name', 'last_name']));
    }
  );

  router.post(
    '/login',
    passport.authenticate('login'),
    (req, res, next) => {
      res.json(_.pick(req.user, ['id', 'username', 'first_name', 'last_name']));
    }
  );

  router.post('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
  });

  router.put('/:id', (req, res, next) => {
    users.updateUserById(req.params.id)
      .then(result => res.json(result))
      .catch(err => {
        console.log(err);
        next(err);
      });
  });

  router.delete('/:id', (req, res) => {
    users.deleteUserById(req.params.id)
      .then(result => res.json(result))
      .catch(err => {
        console.log(err);
        next(err);
      });
  });


  return router;
};
