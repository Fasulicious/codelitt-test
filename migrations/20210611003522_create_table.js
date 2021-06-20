
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.string('name', 100).notNullable()
  table.enu('type', ['contractor', 'employee']).notNullable()
  table.integer('duration')
  table.enu('role', ['software_engineer', 'project_manager'])
  table.enu('tag', ['c_sharp', 'angular', 'general_frontend', 'seasoned_leader']).notNullable()
})

exports.down = knex => knex.schema.dropTable('users')
