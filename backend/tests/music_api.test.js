const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')
// const Session = require('../models/session')

const app = require('../app')

const api = supertest(app)

const loginUser = async () => {
  const userForLogin = {
    username: 'tester',
    password: 'secret_password'
  }

  const loginResult = await api
    .post('/api/login')
    .send(userForLogin)

  return loginResult
}

describe('while there is a user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret_password', 10)
    const user = new User({
      username: 'tester',
      name: 'First Tester',
      passwordHash
    })

    await user.save()
  })

  test('a new user with a non-duplicate username and a valid password can be created', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'unique_tester',
      name: 'Joe',
      password: 'pWord'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a new user with a non-duplicate username, duplicate name and a valid password can be created', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'unique_tester',
      name: 'First Tester',
      password: 'validPassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a new user with a non-duplicate username and an invalid password will be rejected with the proper error message', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'passwordWizard',
      name: 'Jack',
      password: 'pass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 5 characters long')

    const usersAtEnd = await helper.getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('a new user with a duplicate username will be rejected with the proper error message', async () => {
    const usersAtStart = await helper.getUsers()

    const newUser = {
      username: 'tester',
      name: 'John',
      password: 'validPassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('logging in returns a token with the required fields', async () => {
    const userForLogin = {
      username: 'tester',
      password: 'secret_password'
    }

    const result = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    if (!(result.body.token && result.body.username && result.body.name)) {
      throw new Error('all fields are not present')
    }
  })

  test('attempt to log in with a nonexisting user will be rejected with the proper error message', async () => {
    const userForLogin = {
      username: 'whoIsThis',
      password: 'pwpwpwpwpwpw'
    }

    const result = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')
  })

  test('attempt to log in with an invalid password will be rejected with the proper error message', async () => {
    const userForLogin = {
      username: 'tester',
      password: 'pwpwpwpwpwpw'
    }

    const result = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')
  })

  describe('a new session', () => {

    test('can be created with a valid token', async () => {

      const sessionsAtStart = await helper.getSessions()

      const sessionToSend = {
        sessionType: 'interval',
        answersWrong: 0,
        answersCorrect: 5,
        sessionHistory: [
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
        ]
      }

      const loginResult = await loginUser()

      await api
        .post('/api/sessions')
        .send(sessionToSend)
        .set('Authorization', `bearer ${loginResult.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const sessionsAtEnd = await helper.getSessions()

      expect(sessionsAtEnd).toHaveLength(sessionsAtStart.length + 1)
    })

    test('cannot be created without a valid token - no token sent', async () => {

      const sessionsAtStart = await helper.getSessions()

      const sessionToSend = {
        sessionType: 'interval',
        answersWrong: 0,
        answersCorrect: 5,
        sessionHistory: [
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
        ]
      }

      const result = await api
        .post('/api/sessions')
        .send(sessionToSend)
        .expect(401)
        .expect('Content-Type', /application\/json/)


      const sessionsAtEnd = await helper.getSessions()

      expect(sessionsAtEnd).toHaveLength(sessionsAtStart.length)
      expect(result.body.error).toContain('Invalid token')
    })

    test('cannot be created without a valid token - an incorrect token sent', async () => {

      const sessionsAtStart = await helper.getSessions()

      const sessionToSend = {
        sessionType: 'interval',
        answersWrong: 0,
        answersCorrect: 5,
        sessionHistory: [
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
          { answer: 'perfect unison', correctAnswer : 'perfect unison' },
        ]
      }

      const result = await api
        .post('/api/sessions')
        .send(sessionToSend)
        .set('Authorization', 'thisIsNotAValidTokenRight')
        .expect(401)
        .expect('Content-Type', /application\/json/)


      const sessionsAtEnd = await helper.getSessions()

      expect(sessionsAtEnd).toHaveLength(sessionsAtStart.length)
      expect(result.body.error).toContain('Invalid token')
    })
  })

})

test('users are returned in JSON', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('sessions are returned in JSON', async () => {
  await api
    .get('/api/sessions')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})