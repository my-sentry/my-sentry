const expect = require('chai').expect;
const users = require('../../../server/db/controllers/userCtrl.js');
const knex = require('../../../server/db/db.js');

var sampleIds;

before(() => {

  var sampleUsers = [
    {
      username: 'jkrusinski',
      password: 'some_long_hash',
      'first_name': 'Jerry',
      'last_name': 'Krusinski'
    },
    {
      username: 'jgranny',
      password: 'another_long_hash',
      'first_name': 'Jonathan',
      'last_name': 'Grandstaff'
    }
  ];

  return Promise.all(sampleUsers.map(user => {

    return knex('users')
      .returning(['id'])
      .insert(user)
      .then(result => result[0]);

  })).then(ids => sampleIds = ids);

});

after(() => {

  return Promise.all(sampleIds.map(id => {
    return knex('users').where('id', id).del().then(result => null);
  }));

});

describe('User Controller', () => {


  describe('addUser', () => {

    it('should add a new user to the database', () => {

      return users.addUser('Christian', 'Arredondo', 'dondo', 'hashme')

        .then(() => {
          return knex('users').where('username', 'dondo')
            .then(result => {
              sampleIds.push(result[0].id);
              return result[0];
            });
        })

        .then(user => {
          expect(`${user.first_name} ${user.last_name}`).to.equal('Christian Arredondo');
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
