
exports.up = function(knex) {
    return knex.schema.createTable('report',(table)=>{
        table.increments();
        table.string('title');
        table.string('data', 6000);
        table.integer('inspection_id',11).notNull().unsigned();

        table.foreign('inspection_id').references('id').inTable('inspection');
    })
};

exports.down = function(knex) {
  
};
