const bodyParser = require('body-parser')
const express = require('express')
const redis = require('redis')

const config = require('./config')
const Controller = require('./controller')

// Express.
const app = express()
app.use(bodyParser.json())
app.listen(config.port, () => {
  console.log(`Just Log Me Baby listening on port ${config.port}\n\n`)
})

// Redis.
const redisClient = redis.createClient(config.redisUrl)
redisClient.on('connect', () => {
  console.log(`Connected to redis instance at ${config.redisUrl}\n\n`)
  const controller = new Controller(app, redisClient)
  controller.registerRoutes()
})
