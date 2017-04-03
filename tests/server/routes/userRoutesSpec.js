const expect = require('chai').expect;
const request = require('request');

describe('User Routes', function() {

  describe('POST /api/users/signup', () => {

    it('should add a new user to the database', () => {

    });

    it('should respond with a status of 201 and an object describing the new user', () => {

    });

    it('should create a user session on the server when created', () => {

    });

    it('should respond with status 401 if a user already exists', () => {

    });

  });

  describe('POST /api/users/login', () => {

    it('should start a user session on the server upon successful login', () => {

    });

    it('should respond with a status of 200 and an object describing the logged in user', () => {

    });

    it('should respond with a status of 401 if login is unsuccessful', () => {

    });

  });

  describe('POST /api/users/logout', () => {

    it('should end a user session on the server', () => {

    });

    it('should respond with a status of 200 if successful', () => {

    });

    it('should respond with a status of 400 if unsuccessful', () => {

    });

  });

});
