const expect = require('chai').expect;
const events = require('../../../server/db/controllers/eventCtrl.js');
const knex = require('../../../server/db/db.js');

describe('Event Controller', () => {

  beforeEach(() => {
    return knex.seed.run();
  });

  after(() => {
    return knex.seed.run();
  });

  describe('createEvent', () => {

    it('should add an event to the database', () => {

      return events.createEvent(
        'Zilker Park Marathon', // name
        2, // user_id
        1, // group_id
        new Date(2017, 3, 4, 18), // begin (take in date object and convert to string!)
        new Date(2017, 3, 4, 20), // end (take in date object and convert to string!)
        30.263778, // lat
        -97.770775, // long
        'This is what we\'ve been preparing for!' // descrition
      )

      .then(() => {
        return knex('events').where('name', 'Zilker Park Marathon').then(results => results[0]);
      })

      .then(event => {
        expect(event.name).to.equal('Zilker Park Marthon');
        expect(event.user_id).to.equal(2);
        expect(event.group_id).to.equal(1);
        expect(event.begin).to.equal('Tue Apr 04 2017 18:00:00 GMT-0500 (CDT)');
        expect(event.begin).to.equal('Tue Apr 04 2017 20:00:00 GMT-0500 (CDT)');
        expect(event.lat).to.equal(20.263778);
        expect(event.long).to.equal(-97.770775);
        expect(event.description).to.equal('This is what we\'ve been preparing for!');
      });

    });

    it('should respond with the id of the inserted event', () => {

      return events.createEvent(
        'Corn Maze Fun', // name
        1, // user_id
        3, // group_id
        new Date(2017, 3, 14, 12), // begin (take in date object and convert to string!)
        new Date(2017, 3, 14, 16), // end (take in date object and convert to string!)
        30.162990, // lat
        -97.391634, // long
        'I hope I don\' get lost' // descrition
      )

      .then(id => {
        return knex(events).where('name', 'Corn Maze Fun').then(results => {
          var event = results[0];
          expect(event.id).to.equal(id);
        });
      });

    });

  });

  describe('getEvents', () => {

    it('should retrieve events that a user can see', () => {

      return events.getEvents('dondo09')

        .then(events => {

          // get events by admin_user
          return knex('events')
            .select('events.*')
            .innerJoin('groups', 'groups.id', 'events.group_id')
            .innerJoin('users', function() {
              this.on('users.id', '=', 'groups.admin_user')
                .andOn('users.username', '=', 'dondo09');

            // union results of two queries
            }).union(function() {

              // get events by basic user
              this.select('events.*')
                .from('events')
                .innerJoin('groups', 'groups.id', 'events.group_id')
                .innerJoin('group_user', 'group_user.group_id', 'groups.id')
                .innerJoin('users', function() {
                  this.on('users.id', '=', 'group_user.user_id')
                    .andOn('users.username', '=', 'dondo09');
                });
            })

            .then(results => {
              expect(results).to.eql(events);
            });
        });

    });

    it('should respond with an empty array if user cannot see any events', () => {

      return knex('users').insert({
        username: 'tonyTheTiger',
        password: 'some-long-hash',
        'first_name': 'Tony',
        'last_name': 'The Tiger'
      })
    });

  });

  describe('getEventById', () => {

    it('should retrieve an event from the database', () => {

    });

    it('should respond with undefined if an event does not exist', () => {

    });

  });

  describe('getEventsByUserId', () => {

    it('should get a list of events that a user created', () => {

    });

    it('should respond with an empty array if user has not created any events', () => {

    });

  });

  describe('updateEventById', () => {

    it('should update an event in the database', () => {

    });

    it('should respond with an object describing the updated event', () => {

    });

  });

  describe('deleteEventById', () => {

    it('should delete an event in the database', () => {

    });

  });

});

/*
  SELECT events.name FROM events INNER JOIN groups ON events.group_id = groups.id INNER JOIN group_user ON group_user.group_id = groups.id INNER JOIN users ON group_user.user_id = users.id AND groups.admin_user = users.id AND users.username = 'jkrusinski';
*/
