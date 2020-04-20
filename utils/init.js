const envpath = './config/.dev'
require('dotenv').config({ path: envpath })
const db = require('../libs/db')
const models = require('./db_models')
const R = require('ramda')
db.transaction(function (trx) {
  return (async function () {
    for (const [tableName, def] of R.toPairs(models)) {
      if (tableName !== '$') {
        await trx.schema.createTable(tableName, t => {
          for (const field of R.values(def)) {
            if (typeof field === 'function') {
              field(t, db)
            }
          }
        })
      }
    }
  })()
})
  .then(function () {
    db.destroy()
    console.log('DONE.')
  })
  .catch(function (e) {
    console.error(e)
    db.destroy()
  })
