const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const body = req.body
  const saltRounds = 10

  if (body.password.length < 5) {
    return res.status(400).json({ 
      error: 'Password must be at least 5 characters long'
    })
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try { 
    const savedUser = await user.save()
    res.json(savedUser)
  } catch(exception) {
    next(exception)
  }
  
})

//lisää try-catch -->
userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('sessions')
  res.json(users.map(user => user.toJSON()))
})

userRouter.get('/:id', async (req, res, next) => {
  let user = null
  try {
    user = await User
      .findById(req.params.id)
      .populate('sessions')
  } catch(exception) {
    next(exception)
  }
  
  if (user) {
    res.json(user.toJSON())
  } else {
    res.status(404).end()
  }
})

//for debugging
userRouter.get('/info', (req, res) => {
  res.send('<h1> USERS COULD BE HERE? </h1>')
})

module.exports = userRouter