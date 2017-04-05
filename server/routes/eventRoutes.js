var express = require('express');
var router = express.Router();
var events = require('../db/controllers/eventCtrl');
var auth = require('../authHelper');

//Get all events
router.get('/', auth.isAuth, (req, res, next) => {
  if (req.query.username) {
    events.getUserEvents(req.query.username)
      .then(results => res.json(results))
      .catch(err => {
        console.log(err);
        next(err);
      });
  } else {
    events.getEvents(req.user.username)
      .then(results => res.json(results))
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
});

//Get an event by id
router.get('/:id', auth.isAuth, (req, res, next) => {
  events.getEventById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/', auth.isAuth, (req, res, next) => {
  events.createEvent(
    req.user.id,
    req.body.groupId,
    req.body.name,
    req.body.begin,
    req.body.end,
    req.body.lat,
    req.body.long,
    req.body.description
  ).then(result => res.status(201).json(result))
  .catch(err => {
    console.log(err);
    next(err);
  });
});

router.put('/:id', (req, res, next) => {
  events.updateEventById(
    req.params.id,
    req.body.name,
    req.body.begin,
    req.body.end,
    req.body.lat,
    req.body.long,
    req.body.description
  ).then(result => res.json(result))
  .catch(err => {
    console.log(err);
    next(err);
  });
});

router.delete('/:id', (req, res) => {
  events.deleteEventById(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
