
exports.up = function(knex) {
    return knex.schema.createTable('work_details',(table)=>{
        table.increments();
        table.string('title');
        table.string('description');
        table.integer('user_id',11).notNull().unsigned();
        table.integer('inspection_id',11).notNull().unsigned();

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('inspection_id').references('id').inTable('inspection');
    })
};

exports.down = function(knex) {
  
};
