const expect = require('chai').expect;
const request = require('request');

describe('Event Routes', () => {

  describe('GET /api/events', () => {

    it('should be a protected route', () => {

    });

    it('should respond with an array of events the logged in user can see', () => {

    });

    it('should respond with an empty array if the user cannot see any events', () => {

    });

    it('should respond with an array of events a specific user created if username={name} is included in the query', () => {

    });

  });

  describe('POST /api/events', () => {

    it('should be a protected route', () => {

    });

    it('should add an event to the database created by the logged in user', () => {

    });

    it('should respond with a status of 201 and an object describing the inserted event', () => {

    });

  });

  describe('PUT /api/events/:id', () => {

    it('should be a protected route', () => {

    });

    it('should update a specific event in the database', () => {

    });

    it('should only update events created by the logged in user', () => {

    });

    it('should respond with a status of 201 and an object describing the updated event', () => {

    });

  });

  describe('GET /api/events/:id', () => {

    it('should be a protected route', () => {

    });

    it('should respond with a specific event from the database', () => {

    });

    it('should respond with a status 404 if no event is found', () => {

    });

  });

});
