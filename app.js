const bodyParser = require('body-parser')
const cluster = require('cluster')
const express = require('express')
const redis = require('redis')
const SdhpLogger = require('sdhp-logger')

const config = require('./config')
const Controller = require('./controller')

const logger = new SdhpLogger({
  logToConsole: config.logFileDestination == null,
  logToFile: config.logFileDestination != null,
  logFilePath: config.logFileDestination,
  minimumSeverity: config.logSeverity
})

if (config.instances > 1 && cluster.isMaster) {
  logger.info(`Just Log Me Baby Starting in forked mode. Creating ${config.instances} workers.`)

  for (let i = 0; i < config.instances; i++) {
    cluster.fork()
  }
} else {
  bootstrap()
}

function bootstrap () {
  const redisClient = redis.createClient(config.redisUrl)

  redisClient.on('connect', () => {
    logger.debug(`Connected to redis instance at ${config.redisUrl}`)

    // Bootstrap express.
    const app = express()
    app.use(bodyParser.json())
    app.listen(config.port, () => {
      logger.info(`Listening on port ${config.port}`)
    })

    // Start the app.
    const controller = new Controller(app, redisClient, config, logger)
    controller.registerRoutes()
  })

  redisClient.on('error', error => {
    logger.error(`Redis connection error:\n${JSON.stringify(error)}\nKilling app.`)
    process.exit(1)
  })
}
