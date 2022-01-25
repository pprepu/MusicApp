const versionRouter = require('express').Router()

versionRouter.get('/', (req, res) => {
  res.send('0.40')
})

module.exports = versionRouter