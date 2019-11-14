
exports.up = function(knex) {
    return knex.schema.createTable('owner',(table)=>{
        table.increments();
        table.integer('user_id',11).notNull().unsigned();

    })
};

exports.down = function(knex) {
  
};
