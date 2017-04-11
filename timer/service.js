const ipc = require('node-ipc');
const createTimers = require('./helpers/createTimers');
const worker = require('./worker')();

ipc.config.id = 'timer';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

var sendErr = function(socket, err) {
  console.log('Service Error: ', err);
  ipc.server.emit(socket, 'error', JSON.stringify(err, ['message', 'arguments', 'stack', 'name']));
};

ipc.serve(() => {

  ipc.server.on('event', (data, socket) => {
    var event = JSON.parse(data);
    createTimers(event).then(ids => {
      console.log('Created timers: ', ids);
    });
  });

});

ipc.server.start();
