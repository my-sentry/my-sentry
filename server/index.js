var express = require('express');
var path = require('path');

global._ = require('lodash');

// require routes
var events = require('./routes/eventRoutes');
var users = require('./routes/userRoutes');
var groups = require('./routes/groupRoutes');

// require middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');

const port = process.env.PORT || 8000;

var app = express();

app.use(expressSession({
  secret: 'sessionSecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// setup extra middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', users(passport));
app.use('/api/events', events);
app.use('/api/groups', groups);


app.use((req, res, next)=> {
  var err = new Error('ERROR 404 Sorry can\'t find what you\'re looking for!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  var status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
