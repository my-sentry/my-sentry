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

    it('should respond with an object describing the inserted user', () => {

    });

    it('should not respond with the inserted password', () => {

    });

  });

  describe('getUser', () => {

    it('should retrieve a user from the databse by username', () => {

    });

    it('should not retrieve the user\'s password', () => {

    });

    it('should respond with undefined if user does not exist', () => {

    });

  });

  describe('getUserById', () => {

    it('should retrieve a user from the databse by id', () => {

    });

    it('should not retrieve the user\'s password', () => {

    });

  });

  describe('updateUserById', () => {

    it('should update a user in the database', () => {

    });

    xit('should hash a user password if given', () => {

    });

    it('should respond with an object describing the updated user', () => {

    });

    it('should not respond with the user\'s password', () => {

    });

  });

  describe('deleteUserById', () => {

    it('should delete a user in the database', () => {

    });

  });

});
