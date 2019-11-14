const {Model} = require('objection');
const Knex = require('knex');
const knex = Knex({
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
})
Model.knex(knex);
module.exports = Model;