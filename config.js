require('dotenv').config({ silent: true })

module.exports = {
  port: process.env.PORT || 8080,
  redisUrl: process.env.REDIS_URL || '//localhost:6379'
}
