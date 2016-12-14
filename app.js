const bodyParser = require('body-parser')
const express = require('express')
const redis = require('redis')

const Controller = require('./controller')

// Express.
const app = express()
app.use(bodyParser.json())
app.listen(8085, () => {
  console.log('App listening on port 8085\n\n')
})

// Redis.
const redisClient = redis.createClient()
redisClient.on('connect', () => {
  const controller = new Controller(app, redisClient)
  controller.registerRoutes()
})
