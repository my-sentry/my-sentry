const expect = require('chai').expect;
const users = require('../../../server/db/controllers/userCtrl.js');
const knex = require('../../../server/db/db.js');
const bcrypt = require('bcrypt-nodejs');

var compareHash = function(password, hash) {
  return new Promise((fulfill, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        return reject(err);
      }
      fulfill(match);
    });
  });
};

xdescribe('User Controller', () => {

  beforeEach(() => {
    return knex.seed.run();
  });

  after(() => {
    return knex.seed.run();
  });

  describe('addUser', () => {

    it('should add a new user to the database', () => {

      return users.addUser('Megan', 'Rabuse', 'mrabuse', 'password')

        .then(() => {
          return knex('users').where('username', 'mrabuse')
            .then(result => result[0]);
        })

        .then(user => {
          expect(`${user.first_name} ${user.last_name}`).to.equal('Megan Rabuse');
        });

    });

    it('should store a hashed password in the database', () => {

      return users.addUser('Nathan', 'Turinski', 'nturinski', 'hashme')

        .then(() => {
          return knex('users').where('username', 'nturinski')
            .then(result => result [0]);
        })

        .then(user => {
          return compareHash('hashme', user.password);
        })

        .then(match => {
          if (!match) {
            throw new Error('Password does not match hash');
          }
        });

    });

    it('should not add a user if username is not unique', () => {

      // jkrusinski is included in seed data
      return users.addUser('Jerry', 'Krusinski', 'jkrusinski', 'password')

        .then(() => {
          throw new Error('Promise should be rejected');
        })

        // catch the rejection so test will pass
        .catch(() => 'Test Passed');

    });

    it('should respond with the id of the inserted user', () => {

      return users.addUser('Carla', 'Clay', 'cclay', 'password')

        .then(id => {
          return knex('users').where('id', id);
        })

        .then(results => {
          var user = results[0];
          expect(user.username).to.equal('cclay');
        });

    });

  });

  describe('getUser', () => {

    it('should retrieve a user from the databse by username', () => {

      return users.getUser('jkrusinski')

        .then(user => {
          expect(user.first_name).to.equal('Jerry');
        });

    });

    it('should not retrieve the user\'s password', () => {

      return users.getUser('jkrusinski')

        .then(user => {
          expect(user.password).to.be.undefined;
        });

    });

    it('should respond with undefined if user does not exist', () => {

      return users.getUser('hellokitty')

        .then(user => {
          expect(user).to.be.undefined;
        });
    });

  });

  describe('getUserById', () => {

    it('should retrieve a user from the databse by id', () => {

      return users.getUserById(2)

        .then(user => {
          expect(user.username).to.equal('jgranny');
        });

    });

    it('should not retrieve the user\'s password', () => {

      return users.getUserById(2)

        .then(user => {
          expect(user.password).to.be.undefined;
        });

    });

  });

  describe('updateUserById', () => {

    it('should update a user in the database', () => {

      return user.updateUserById(1, { 'first_name': 'monkeybrains' })

        .then(() => {
          return knex('users').where('id', 1).then(results => results[0]);
        })

        .then(user => {
          expect(user.first_name).to.equal('monkeybrains');
        });

    });

    xit('should hash a user password if given', () => {

    });

  });

  describe('deleteUserById', () => {

    it('should delete a user in the database', () => {

      return deleteUserById(1)

        .then(() => {
          return knex('users').where('id', 1).then(results => results[0]);
        })

        .then(user => {
          expect(user).to.be.undefined;
        });

    });

  });

});
