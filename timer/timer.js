const ipc = require('node-ipc');

ipc.config.id = 'timer';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

ipc.serve(() => {

  ipc.server.on('start', () => {
    ipc.log(`Timer Service listening on port ${ipc.config.port}.`.debug);
  });

  ipc.server.on('message', (data, socket) => {
    ipc.log('You got a message: '.debug, data);
    ipc.server.emit(socket, 'message', 'Thank you, I received your message.');
  });

});

ipc.server.start();
