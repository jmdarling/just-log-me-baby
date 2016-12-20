require('dotenv').config({ silent: true })
const os = require('os')

module.exports = {
  port: process.env.PORT || 8080,
  instances: process.env.JUST_LOG_ME_BABY_INSTANCES || os.cpus().length,
  redisListKey: process.env.JUST_LOG_ME_BABY_REDIS_LIST_KEY || 'just-log-me-baby-queue',
  redisUrl: process.env.REDIS_URL || '//localhost:6379',
  logFileDestination: process.env.JLMB_LOG_FILE_DESTINATION || null,
  logSeverity: process.env.JLMB_LOG_SEVERITY || 'INFO'
}
