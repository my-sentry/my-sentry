const expect = require('chai').expect;
const users = require('../../../server/db/controllers/userCtrl.js');
const knex = require('../../../server/db/db.js');



describe('User Controller', () => {

  before(() => {
    knex.seed.run();
  });

  after(() => {
    knex.seed.run();
  });

  describe('addUser', () => {

    it('should add a new user to the database', () => {

      return users.addUser('Megan', 'Rabuse', 'mrabuse', 'hashme')

        .then(() => {
          return knex('users').where('username', 'mrabuse')
            .then(result => result[0]);
        })

        .then(user => {
          expect(`${user.first_name} ${user.last_name}`).to.equal('Megan Rabuse');
        });

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
