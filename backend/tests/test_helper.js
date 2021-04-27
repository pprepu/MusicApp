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

module.exports = {
  getUsers,
  getSessions
}