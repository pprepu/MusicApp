const healthRouter = require('express').Router()

healthRouter.get('/', (req, res) => {
  res.send('ok')
})

module.exports = healthRouter