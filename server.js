const path = require('path')
const envpath = 'config/.dev'
require('dotenv').config({ path: envpath })
const fastify = require('fastify')({ logger: true })
const AutoLoad = require('fastify-autoload')
fastify.register(require('fastify-cors'))
fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: '用户消息',
        description: `读取用户消息，返回数组以时间倒序排列。若direction=latest则timeOffset必须提供，返回最新记录列表。`,
        version: '1.0.0'
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    routePrefix: '/api',
    exposeRoute: true
  })

fastify.register(AutoLoad, { dir: path.join(__dirname, 'routes') })
// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

fastify.ready(err => {
  if (err) throw err
  console.log('server ready')
  fastify.swagger()
  console.log('Swagger ready')
})

start()
module.exports = fastify
