const User = require('../models/user')
const Session = require('../models/session')

const getUsers = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getSessions = async () => {
  const sessions = await Session.find({})
  return sessions.map(session => session.toJSON())
}

const nonExistingSessionId = async () => {
  const session = new Session({ sessionType: 'interval' })
  await session.save()
  await session.remove()

  return session._id.toString()
}

module.exports = {
  getUsers,
  getSessions,
  nonExistingSessionId
}