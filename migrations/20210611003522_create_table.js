
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.string('name', 100).notNullable()
  table.enu('type', ['contractor', 'employee']).notNullable()
  table.integer('duration')
  table.enu('role', ['software engineer', 'project manager'])
  table.enu('tag', ['c#', 'angular', 'general frontend', 'seasoned leader']).notNullable()
})

exports.down = knex => knex.schema.dropTable('users')
