var express = require('express');
var router = express.Router();
var events = require('../db/controllers/eventCtrl');
var auth = require('../authHelper');

//Get all events
router.get('/', auth.isAuth, (req, res, next) => {
  if (req.query.userid) {
    events.getEventsByUserId(req.query.userid)
      .then(results => res.json(results))
      .catch(err => {
        console.log(err);
        next(err);
      });
  } else {
    events.getEvents()
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

//Get a users events by user_id
router.get('/:uid', auth.isAuth, (req, res, next) => {
  events.getEventsByUserId(req.params.uid)
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.post('/', auth.isAuth, (req, res, next) => {
  events.createEvent(
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

//NOTE: Not sure if this will work if a field is undefined...
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
