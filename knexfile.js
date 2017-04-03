module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: 'root',
      database: 'mysentry'
    },
    seeds: {
      directory: './server/db/seeds/run/'
    }
  }
};
