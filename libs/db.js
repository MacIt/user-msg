const { PG_HOST, PG_PORT, PG_DATABASE, PG_PASSWORD, PG_USER, DB_DEBUG } = process.env
module.exports = (require('knex')({
  client: 'pg',
  connection: {
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT
  },
  debug: DB_DEBUG === '1'
}))
