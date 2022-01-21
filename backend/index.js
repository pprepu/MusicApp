const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log('-------------------------------------')
  console.log('-------------------------------------')
  console.log(`Server running on port: ${config.PORT}`)
  logger.info(`Server running on port: ${config.PORT}`)
  console.log('-------------------------------------')
  console.log('-------------------------------------')
})
