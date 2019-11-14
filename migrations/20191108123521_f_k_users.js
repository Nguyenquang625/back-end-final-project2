
exports.up = function(knex) {
    return knex.schema.table('users',(table)=>{
        
      table.foreign('team_id').references('id').inTable('team');
    })
};

exports.down = function(knex) {
  
};
