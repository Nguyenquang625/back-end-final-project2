
exports.up = function(knex) {
    return knex.schema.table('inspection',(table)=>{
        table.foreign('status').references('id').inTable('status');
    })
};

exports.down = function(knex) {
  
};
