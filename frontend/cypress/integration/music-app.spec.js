const homepage = 'http://localhost:3000'

describe('MusicApp ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'John Tester',
      username: 'jTester',
      password: 'secret_password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit(homepage)
  })
  it('front page can be opened', function() {
    cy.contains('Welcome to')
    cy.contains('Practice')
    cy.contains('About')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
    cy.contains('username:')
    cy.contains('password:')
  })

  it('user can log in', function() {
    cy.contains('Login').click()
    cy.get('#username').type('jTester')
    cy.get('#password').type('secret_password')
    cy.get('#login-button').click()

    cy.contains('User')
    cy.contains('Logout')
  })
})