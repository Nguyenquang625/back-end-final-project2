
exports.up = function(knex) {
  
    return knex.schema.createTable('chat',(table)=>{
        table.increments();
        table.string('name');
        table.string('chatlog');
        table.integer('user_id',11).notNull().unsigned();
        table.integer('team_id',11).notNull().unsigned();
        table.timestamps(true,true);
        
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('team_id').references('id').inTable('team');
    })
};

exports.down = function(knex) {
  
};
