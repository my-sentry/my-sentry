const expect = require('chai').expect;
const users = require('../../server/db/controllers/userCtrl.js');

describe('User Controller', () => {

  describe('addUser', () => {

    it('should add a new user to the database', () => {

    });

    it('should store a hashed password in the database', () => {

    });

    it('should not add a user if username is not unique', () => {

    });

  });

  describe('getUser', () => {

    it('should retrieve a user from the databse by username', () => {

    });

    it('should not return the password in the response', () => {

    });

  });

  describe('getUserById', () => {

    it('should retrieve a user from the databse by id', () => {

    });

    it('should not return the password in the response', () => {

    });

  });

  describe('updateUserById', () => {

    it('should update a user in the database', () => {

    });

    xit('should hash a user password if given', () => {

    });

  });

  describe('deleteUserById', () => {

    it('should delete a user in the database', () => {

    });

  });

});
