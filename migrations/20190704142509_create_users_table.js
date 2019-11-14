//up thuc hien viec action thay doi
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
      table.increments();
      table.string('name',255);
      table.string('username').unique();
      table.string('password');
      table.string('adress');
      table.string('phone_number');
      table.string('gender');
      table.string('mail');
      table.integer('level',10).notNull().defaultTo(0);
      table.timestamps(true,true);
      
      table.integer('team_id',11).notNull().unsigned();
      
  })
};

exports.down = function(knex) {
  
};
