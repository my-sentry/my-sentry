const expect = require('chai').expect;
const server = require('../../server/index.js');
const request = require('request');

describe('Group Routes', () => {

  describe('GET /api/groups', () => {

    it('should be a protected route', () => {

    });

    it('should respond with a array of groups the logged in user belongs to', () => {

    });

    it('should respond with an empty array if the user does not belong to any groups', () => {

    });

    describe('each group returned', () => {

      it('should include an array of members in that group', () => {

      });

    });

  });

  describe('POST /api/groups', () => {

    it('should be a protected route', () => {

    });

    it('should add a group to the database', () => {

    });

    it('should respond with a status of 201 and an object describing the inserted group', () => {

    });

    it('should make the logged in user the admin_user of the group', () => {

    });

  });

  describe('PUT /api/groups/:id', () => {

    it('should be a protected route', () => {

    });

    it('should add users to the group', () => {

    });

    it('should delete users from the group if the url contains a query parameter \'delete\'', () => {

    });

    it('should only update groups that the logged in user created', () => {

    });

    it('should respond with a status of 201 and an object that describes the updated group', () => {

    });

  });

  describe('GET /api/groups/:id', () => {

    it('should be a protected route', () => {

    });

    it('should respond with a status of 200 and the group', () => {

    });

    it('should respond with a status of 404 if group is not found', () => {

    });

    describe('the group returned', () => {

      it('should include an array of members in that group', () => {

      });

    });

  });

});
