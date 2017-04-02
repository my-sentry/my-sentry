const assert = require('assert');
const expect = require('chai').expect;
const server = require('../../server/index.js');
const request = require('request');
const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');

/*
  GET /api/users

    no query: get all users

  GET /api/users/:id

    no query: get a specific user

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

describe('Server', function() {

  it('should do something', () => {
    // console.log(server);

  });

  it('should do something', () => {

  });

  it('should do something', () => {

  });

  it('should do something', () => {

  });

});
