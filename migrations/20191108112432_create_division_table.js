
exports.up = function(knex) {
    return knex.schema.createTable('division',(table)=>{
        table.increments();
        table.string('area',255).notNull().unique();
    })
};

exports.down = function(knex) {
  
};
