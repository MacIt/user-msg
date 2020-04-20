const tap = require('tap')
const fastify = require('../server')
// tap.test('GET `/user/messages` route', (t) => {
//   t.plan(4)

//   // At the end of your tests it is highly recommended to call `.close()`
//   // to ensure that all connections to external services get closed.
//   t.tearDown(() => fastify.close())

//   fastify.inject({
//     method: 'GET',
//     url: '/user/messages'
//   }, (err, response) => {
//     t.error(err)
//     t.strictEqual(response.statusCode, 200)
//     t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
//     t.ok(response.json().length >= 0, '正确返回记录')
//   })
// })

tap.test('POST `/user/message` route', (t) => {
  t.plan(4)

  const data = {
    username: 'Leo Wang',
    msg: 'Hi there'
  }
  t.tearDown(() => fastify.close())
  fastify.inject({
    method: 'POST',
    url: '/user/message',
    payload: data
  }, (err, response) => {
    t.error(err)
    t.strictEqual(response.statusCode, 200)
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
    t.type(response.json(), 'object')
  })
})
