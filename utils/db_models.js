const tables = {}

tables.user_msg = {
  id: t => t.increments('id'),
  username: t => t.string('username'),
  msg: t => t.string('msg').notNullable().comment('用户消息'),
  created: t => t.bigInteger('created')
}

module.exports = tables
