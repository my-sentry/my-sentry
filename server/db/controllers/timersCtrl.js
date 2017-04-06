var knex = require('../db');

exports.createTimer = function(timer) {
  return knex('timers').insert(timer).then(results => results[0]);
};
