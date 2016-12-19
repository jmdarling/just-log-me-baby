const bodyParser = require('body-parser')
const cluster = require('cluster')
const debug = require('debug')('app')
const express = require('express')
const fs = require('fs')
const redis = require('redis')

const config = require('./config')
const Controller = require('./controller')

// Allow writing stdout and stderr to files.
if (config.stdoutFileDestination != null) {
  const stdoutWriteStream = fs.createWriteStream(config.stdoutFileDestination)
  process.stdout.write = stdoutWriteStream.write.bind(stdoutWriteStream)
}

if (config.stderrFileDestination != null) {
  const stderrWriteStream = fs.createWriteStream(config.stderrFileDestination)
  process.stderr.write = stderrWriteStream.write.bind(stderrWriteStream)
}

if (config.instances > 1 && cluster.isMaster) {
  debug(`App starting. Creating ${config.instances} workers.`)

  for (let i = 0; i < config.instances; i++) {
    cluster.fork()
  }
} else {
  bootstrap()
}

function bootstrap () {
  const redisClient = redis.createClient(config.redisUrl)

  redisClient.on('connect', () => {
    debug(`Worker ${process.pid} connected to redis instance at ${config.redisUrl}`)

    // Bootstrap express.
    const app = express()
    app.use(bodyParser.json())
    app.listen(config.port, () => {
      debug(`Worker ${process.pid} listening on port ${config.port}`)
    })

    // Start the app.
    const controller = new Controller(app, redisClient, config)
    controller.registerRoutes()
  })

  redisClient.on('error', error => {
    console.error(`Redis connection error:\n${JSON.stringify(error)}\nKilling app.`)
    process.exit(1)
  })
}
