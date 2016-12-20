module.exports = class Controller {

  /**
   * Creates an instance of Controller.
   *
   * @param {Express} app
   * @param {Redis}   redisClient
   * @param {Object}  config
   */
  constructor (app, redisClient, config, logger) {
    this._app = app
    this._redisClient = redisClient
    this._config = config
    this._logger = logger
  }

  /**
   * Registers API routes with Express.
   */
  registerRoutes () {
    this._app.get('/queue/length', (request, response) => {
      this._redisClient.llen(this._config.redisListKey, (error, length) => {
        if (error != null) {
          response.status(500).send(error)
          return
        }

        response.send({queueLength: length})
      })
    })

    this._app.post('/log/:database', (request, response) => {
      const log = {
        database: request.params.database,
        content: request.body
      }

      const stringifiedLog = JSON.stringify(log)

      this._redisClient.lpush(this._config.redisListKey, stringifiedLog, error => {
        if (error != null) {
          this._logger.error(`Redis LPUSH error:\n${JSON.stringify(error)}`)
          response.status(500).send(error)
          return
        }

        this._logger.debug(`Wrote log to Redis:\n${JSON.stringify(log)}`)
        response.status(200).end()
      })
    })

    this._app.get('*', (request, response) => {
      response.send('💎ITS WORKING💎<br /><img src="https://media.giphy.com/media/9K2nFglCAQClO/200.gif" />')
    })
  }
}
