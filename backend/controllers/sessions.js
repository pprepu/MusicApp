const sessionRouter = require('express').Router()
const Session = require('../models/session')
const User = require('../models/user')

sessionRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.sessionType) {
    return res.status(400).json({ 
      error: 'A session type must be provided'
    })
  }
  
  const session = new Session({
    sessionType: body.sessionType,
    answersCorrect: body.answersCorrect || 0,
    answersWrong: body.answersWrong || 0,
    sessionHistory: body.sessionHistory || [],
    date: new Date(),
  })

  let user = null
  if (body.userId) {
    try {
      user = await User.findById(body.userId)
      session.user = user._id
    } catch(exception) {
      next(exception)
      return
    }
    
  }
  
  try { 
    const savedSession = await session.save()
    if (user) {
      user.sessions = user.sessions.concat(savedSession._id)
      await user.save()
    }
    res.json(savedSession)
  } catch(exception) {
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