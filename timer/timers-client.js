var ipc = require('node-ipc');
var _ = require('lodash');

ipc.config.id = 'server';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

var listeners = {};

var initialize = function() {

  ipc.of.timer.on('connect', () => {
    console.log('Connected to the timer service on port ' + ipc.config.port);
  });

  ipc.of.timer.on('disconnect', () => {
    console.log('Disconnected from the timer service.');
  });

  ipc.of.timer.on('error', (data) => {
    console.log(data);
  });

};

exports.initialize = function() {
  ipc.connectTo('timer', initialize);
};

exports.sendEvent = function(event) {
  ipc.of.timer.emit('event', JSON.stringify(event));
};
