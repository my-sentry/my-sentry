const expect = require('chai').expect;
const events = require('../../../server/db/controllers/eventCtrl.js');

describe('Event Controller', () => {

  describe('createEvent', () => {

    it('should add an event to the database', () => {

    });

    it('should respond with an object describing the inserted event', () => {

    });

  });

  describe('getEvents', () => {

    it('should retrieve a list of events', () => {

    });

    it('should only retrieve events that a user can see', () => {

    });

    xit('should retrive events ordered by ???', () => {

    });

    it('should respond with an empty array if user cannot see any events', () => {

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
