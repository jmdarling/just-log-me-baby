const debug = require('debug')('controller')

module.exports = class Controller {

  /**
   * Creates an instance of Controller.
   *
   * @param {Express} app
   * @param {Redis}   redisClient
   * @param {Object}  config
   */
  constructor (app, redisClient, config) {
    this._app = app
    this._redisClient = redisClient
    this._config = config
  }

  /**
   * Registers API routes with Express.
   */
  registerRoutes () {
    this._app.post('/log/:database', (request, response) => {
      const log = {
        database: request.params.database,
        content: request.body
      }

      const stringifiedLog = JSON.stringify(log)

      this._redisClient.lpush(this._config.redisListKey, stringifiedLog, error => {
        if (error != null) {
          console.error(`Worker ${process.pid} Redis LPUSH error:\n${JSON.stringify(error)}`)
          response.status(500).send(error)
          return
        }

        debug(`Worker ${process.pid} wrote log to Redis:\n${JSON.stringify(log)}`)
        response.status(200).end()
      })
    })

    this._app.get('*', (request, response) => {
      response.send('💎ITS WORKING💎')
    })
  }
}
