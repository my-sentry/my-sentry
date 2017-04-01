var express = require('express');
var router = express.Router();
var groups = require('../db/controllers/groupCtrl');

router.get('/', (req, res, next) => {
  groups.getGroups()
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  groups.getGroup(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  groups.createGroup(
    req.body.name,
    req.body.adminUser
  ).then(result = res.json(result))
  .catch(err => {
    console.log(err);
    next(err);
  });
});

router.put('/:id', (req, res, next) => {
  groups.updateGroupById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.delete('/:id', (req, res) => {
  groups.deleteGroupById(req.params.id);
  res.end();
});

module.exports = router;
