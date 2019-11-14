
exports.up = function(knex) {
    return knex.schema.createTable('team',(table)=>{
        table.increments();
        table.string('subarea',255).notNull();
        table.integer('division_id',11).notNull().unsigned();

    })
};

exports.down = function(knex) {
  
};
