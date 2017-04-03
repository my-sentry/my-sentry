var express = require('express');
var router = express.Router();
var users = require('../db/controllers/userCtrl');

router.get('/', (req, res, next) => {
  users.getUsers()
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  users.getUserById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  users.addUser(
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    req.body.password
  ).then(result => res.json(result))
  .catch(err => {
    console.log(err);
    next(err);
  });
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


module.exports = router;
