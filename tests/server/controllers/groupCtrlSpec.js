const expect = require('chai').expect;
const groups = require('../../../server/db/controllers/groupCtrl.js');
const knex = require('../../../server/db/db.js');

xdescribe('Group Controller', () => {

  beforeEach(() => {
    return knex.seed.run();
  });

  after(() => {
    return knex.seed.run();
  });

  describe('createGroup', () => {

    it('should add a group to the database', () => {

      return groups.createGroup('Hack Reactor - Students', 4)

        .then(() => {
          return knex('groups')
            .where('name', 'Hack Reactor - Students')
            .then(results => results[0]);
        })

        .then(group => {
          expect(group.admin_user).to.equal(4);
        });

    });

    it('should respond with the id of the inserted group', () => {

      return groups.createGroup('Jeep Sales Team', 2)

        .then(id => {
          return knex('groups')
            .where('name', 'Jeep Sales Team')
            .then(results => expect(id).to.equal(results[0].id));
        });

    });

  });

  describe('getGroupById', () => {

    it('should retrieve a group from the databse', () => {

      return groups.getGroupById(3)

        .then( group => {
          expect(group.name).to.equal('Corn Maze Enthusiasts Group');
        });

    });

    it('should respond with undefined if no group exists', () => {

      return groups.getGroupById(800)

        .then(group => {
          expect(group).to.be.undefined;
        });

    });

  });

  describe('getGroups', () => {

    it('should retrive a list of groups specific to the user', () => {

      // this isn't the best, because if we add of our seed users to new groups this won't pass anymore
      return groups.getGroups('jkrusinski')

        .then(results => {
          var names = results.map(group => group.name);

          expect(names).to.include('Corn Maze Enthusiasts Group');
          expect(names).to.include('Downtown Runners Alliance');
        });

    });

    it('should respond with an empty array if no groups exist', () => {

      return knex('users')
        .insert({
          username: 'mrabuse',
          password: 'somelonghash',
          'first_name': 'Megan',
          'last_name': 'Rabuse'
        })

        .then(() => {
          return groups.getGroups('mrabuse');
        })

        .then(results => {
          expect(results).to.be.empty;
          expect(results).to.be.instanceOf(Array);
        });

    });

  });

  describe('updateGroupById', () => {

    it('should update a group in the database', () => {

      return groups.updateGroupById(1, { 'admin_user': 1 })

        .then(() => {
          return knex('groups').where('id', 1).then(results => results[0]);
        })

        .then(group => {
          expect(group.admin_user).to.equal(1);
        });

    });

  });

  describe('deleteGroupById', () => {

    it('should delete a group in the database', () => {

      return groups.deleteGroupById(1)

        .then(() => {
          return knex('groups').where('id', 1).then(results => results[0]);
        })

        .then(group => {
          expect(group).to.be.undefined;
        });

    });

  });

});
