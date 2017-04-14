var express = require('express');
var router = express.Router();
var groups = require('../db/controllers/groupCtrl');
var auth = require('../authHelper');

router.get('/', auth.isAuth, (req, res, next) => {
  groups.getGroups(req.user.username)
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  groups.getGroupById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/', auth.isAuth, (req, res, next) => {
  groups.createGroup(
    req.body.name,
    req.user.id
  ).then(groupId => {
    return Promise.all(req.body.members.map(member => {
      return groups.addUserToGroup(groupId, member.id);
    })).then(() => {
      res.json(groupId);
    });
  })
  .catch(err => {
    console.log(err);
    next(err);
  });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;

  if (req.query.delete) {
    return Promise.all(req.body.userArray.map(user => {
      return groups.deleteUserFromGroup(id, user.id);
    })).then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        next(err);
      });
  } else {
    groups.addUserToGroup(id, req.body.userId)
      .then(id => res.json(id))
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
});

router.delete('/:id', (req, res, next) => {
  groups.deleteGroupById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
