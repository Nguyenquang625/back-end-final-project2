
exports.up = function(knex) {
  
    return knex.schema.table('inspection',(table)=>{
        table.foreign('team_id').references('id').inTable('team');
        table.foreign('owner_id').references('id').inTable('owner');
    })
};

exports.down = function(knex) {
  
};
