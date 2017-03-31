var express = require('express');
var path = require('path');

// require routes
var events = require('./routes/eventRoutes');
var users = require('./routes/userRoutes');
var groups = require('./routes/groupRoutes');

// require middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');

var app = express();
app.use(passport.initialize());
app.use(passport.session());

// setup extra middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api/users', users)
// app.use('/api/events', events)
// app.use('/api/groups', groups)


app.use((req, res, next)=> {
  var err = new Error('ERROR 404 Sorry can\'t find what you\'re looking for!');
  err.status = 404;
  next(err);
});
app.listen(8000, () => {
  console.log('`Server is listening on port !`');
});