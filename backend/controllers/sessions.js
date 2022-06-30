const sessionRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Session = require('../models/session')
const User = require('../models/user')

const getTokenFromReq = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }

  return null
}

sessionRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.sessionType) {
    return res.status(400).json({
      error: 'A session type must be provided'
    })
  }

  const token = getTokenFromReq(req)

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    let user = await User.findById(decodedToken.id)

    const session = new Session({
      sessionType: body.sessionType,
      answersCorrect: body.answersCorrect || 0,
      answersWrong: body.answersWrong || 0,
      sessionHistory: body.sessionHistory || [],
      date: new Date(),
      user: user._id
    })
    const savedSession = await session.save()
    user.sessions = user.sessions.concat(savedSession._id)
    await user.save()

    res.json(savedSession.toJSON())
  } catch (exception) {
    next(exception)
  }
})

//lisää try-catch -->
sessionRouter.get('/', async (req, res) => {
  const sessions = await Session
    .find({})
    .populate('user', { username: 1 })
  res.json(sessions.map(session => session.toJSON()))
})

//for debugging
sessionRouter.get('/info', (req, res) => {
  res.send('<h1> SESSIONS COULD BE HERE? </h1>')
})

module.exports = sessionRouter