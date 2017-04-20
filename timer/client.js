var ipc = require('node-ipc');

ipc.config.id = 'server';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

var initialize = function() {

  ipc.of.timer.on('connect', () => {
    console.log('Connected to the timer service on port ' + ipc.config.port);
  });

  ipc.of.timer.on('disconnect', () => {
    console.log('Disconnected from the timer service.');
  });
};

exports.initialize = function() {
  ipc.connectTo('timer', initialize);
};

exports.sendEvent = function(event) {
  ipc.of.timer.emit('create', JSON.stringify(event));
};

exports.alertSafe = function(eventId) {
  ipc.of.timer.emit('safe', JSON.stringify(eventId));
};

exports.alertDanger = function(eventId) {
  ipc.of.timer.emit('danger', JSON.stringify(eventId));
};

exports.deleteTimers = function(eventId) {
  ipc.of.timer.emit('end', JSON.stringify(eventId));
};
