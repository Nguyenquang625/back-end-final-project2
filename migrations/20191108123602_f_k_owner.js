
exports.up = function(knex) {
  
    return knex.schema.table('owner',(table)=>{
        table.foreign('user_id').references('id').inTable('users')

    })
};

exports.down = function(knex) {
  
};
