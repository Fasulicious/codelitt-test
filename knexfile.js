const {
  DB_USER: user,
  DB_NAME: database,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_PORT: port
} = process.env

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database,
      user,
      password,
      host,
      port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database,
      user,
      password,
      host,
      port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
