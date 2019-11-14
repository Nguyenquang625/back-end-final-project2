// Update with your config settings.

module.exports = {

    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'electricity',
      user:     'root',
      password: 'Thebestmedusa123'
    },
    //tu tim hieu pool
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
};
