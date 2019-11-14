
exports.up = function(knex) {
    return knex.schema.createTable('status',(table)=>{
        table.increments();
        table.string('type');

    })
};

exports.down = function(knex) {
  
};
