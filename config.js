require('dotenv').config({ silent: true })

module.exports = {
  port: process.env.PORT || 8080,
  instances: process.env.JUST_LOG_ME_BABY_INSTANCES || 1,
  redisUrl: process.env.REDIS_URL || '//localhost:6379'
}
