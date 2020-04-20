const db = require('../libs/db')
const { camelize } = require('casing')
const moment = require('moment')
const userMsgTable = 'user_msg'
/**
 * User msg
 * @param {*} fastify
 * @param {*} options
 */

async function msg (fastify, options) {
  const opts = {
    schema: {
      description: '保存用户消息',
      body: {
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 1 },
          msg: { type: 'string', minLength: 2 }
        },
        required: ['username', 'msg']
      }
    }
  }

  fastify.post('/user/message', opts, async (request, reply) => {
    const { username, msg } = request.body
    const [res] = await db(userMsgTable)
      .insert({ username, msg, created: moment().valueOf() })
      .returning('*')
      .then(camelize)
      .catch(err => {
        reply.code(500).send(err)
      })
    return res
  })

  const getOpts = {
    schema: {
      description: '读取用户消息，返回数组以时间倒序排列。若direction=latest则timeOffset必须提供。默认direction为normal',
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'number', minimum: 1, maximum: 20, description: '读取条数，最小1条，最大20条，默认10条' },
          timeOffset: { type: 'integer', description: '上次读的最后一条取消息时间戳' },
          direction: { type: 'string', enum: ['latest', 'normal'], description: '读取方式' }
        },
        required: ['direction'],
        if: { properties: { direction: { pattern: 'latest' } } },
        then: { required: ['timeOffset'] }
      }
    }
  }
  fastify.get('/user/messages', getOpts, async (request, reply) => {
    const { limit = 10, timeOffset, direction = 'normal' } = request.query
    const dbConn = db(userMsgTable)
    timeOffset && dbConn.where('created', '>=', timeOffset)
    dbConn.select('*')
    if (direction !== 'latest') {
      limit && dbConn.limit(limit)
    }
    let result = await dbConn
      .orderBy('created', 'desc')
      .then(camelize)
      .catch(err => {
        reply.code(500).send(err)
      })
    return result
  })
}

module.exports = msg
