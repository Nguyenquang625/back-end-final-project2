
exports.up = function(knex) {
    return knex.schema.createTable('inspection',(table)=>{
        table.increments();
        table.string('title');
        table.integer('status').notNull().unsigned();
        table.string('line_location');
        table.string('line_condition');
        table.string('description');
        table.string('equipment_require');
        table.datetime('start_date').defaultTo(knex.fn.now());
        table.datetime('end_date').defaultTo(knex.fn.now());
        table.timestamps(true,true);
        table.integer('team_id',11).notNull().unsigned();
        table.integer('owner_id',11).notNull().unsigned();
        
    
        
    })
};

exports.down = function(knex) {
  
};
