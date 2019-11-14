
exports.up = function(knex) {
  
    return knex.schema.table('team',(table)=>{
        table.foreign('division_id').references('id').inTable('division');
    })
};

exports.down = function(knex) {
  
};
