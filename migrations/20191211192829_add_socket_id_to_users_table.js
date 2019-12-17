
exports.up = function(knex) {
    return knex.schema.table('users',(table)=>{
        table.string('socket_id').after('mail');
    })
};

exports.down = function(knex) {
  
};
