const router = require('express').Router()
const Session = require('../models/session')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Session.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router