module.exports = class Controller {

  /**
   * Creates an instance of Controller.
   *
   * @param {Express} app
   * @param {Redis}   redisClient
   */
  constructor (app, redisClient) {
    this._app = app
    this._redisClient = redisClient

    this._listKey = 'simple_logger_queue'
  }

  registerRoutes () {
    this._app.post('/log/:database', (request, response) => {
      const log = {
        database: request.params.database,
        content: request.body
      }

      this._redisClient.lpush(this._listKey, JSON.stringify(log), () => {
        console.log(`Log written to Redis:\n${JSON.stringify(log)}\n\n`)
        response.status(200).end()
      })
    })

    this._app.get('*', (request, response) => {
      response.send('💎')
    })
  }
}
