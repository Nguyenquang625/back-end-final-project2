
exports.up = function(knex) {
    return knex.schema.createTable('notification',(table)=>{
        table.increments();
        table.string('data',6000);
        table.integer('checked');
        table.integer('team_id',11).notNull().unsigned();

        table.foreign('team_id').references('id').inTable('team');
    })
};

exports.down = function(knex) {
  
};
