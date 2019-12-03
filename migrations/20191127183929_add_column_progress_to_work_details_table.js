
exports.up = function(knex) {
    return knex.schema.table('work_details',(table)=>{
        table.integer('progress').defaultTo(0).after('description');
    })
};

exports.down = function(knex) {
  
};
