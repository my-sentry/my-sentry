var ipc = require('node-ipc');

ipc.config.id = 'server';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

var initialize = function() {

  ipc.of.timer.on('connect', () => {
    ipc.log('Connected to the service');
  });

  ipc.of.timer.on('disconnect', () => {
    ipc.log('Disconnected from the service');
  });

  ipc.of.timer.on('message', data => {
    ipc.log('Message from service: ', data);
  });

};

ipc.connectTo('timer', initialize);

exports.emit = ipc.of.timer.emit.bind(ipc.of.timer);

exports.on = ipc.of.timer.on.bind(ipc.of.timer);
