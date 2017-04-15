const ipc = require('node-ipc');
const { populateTimers, endEvent } = require('./helpers/util');

require('./worker').start();

ipc.config.id = 'timer';
ipc.config.port = 6060;
ipc.config.repeat = 1500;

ipc.serve(() => {

  ipc.server.on('create', (data, socket) => {
    var event = JSON.parse(data);
    populateTimers(event.id, event.end).then(ids => {
      console.log('Created timers: ', ids);
    });
  });

  ipc.server.on('safe', (data, socket) => {
    var eventId = JSON.parse(data);
    endEvent(eventId);
    console.log(`So and so was marked safe for event ${eventId}`);
  });

  ipc.server.on('danger', (data, socket) => {
    var eventId = JSON.parse(data);
    console.log(`So and so was marked safe for event ${eventId}`);
  });

});

ipc.server.start();
