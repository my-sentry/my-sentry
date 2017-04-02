const expect = require('chai').expect;
const server = require('../../server/index.js');
const request = require('request');

/*
  POST /api/users/signup

    no query: signup route. add user to the database and start user session

  POST /api/users/login

    no query: login route. start a user session

  POST /api/users/logout

    no query: logout the user session
*/

/*
  GET /api/groups

    no query: get a list of all groups that a user belongs to with their members

  POST /api/groups

    no query: add a group to the database

  PUT /api/groups/:id

    no query: add a user to the group
    ?delete=true: remove a user from the group

  GET /api/groups/:id

    no query: get a specifc group with their members
*/

/*
  GET /api/events

    no query: get all events a user can see (all events in all the groups a user has access to)
    ?username={name}: get all events a user created

  POST /api/events

    no query: make a new events

  PUT /api/events/:id

    no query: update an event

  GET /api/events/:id

    no query: get a specific event
*/

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
