import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { resetSession } from '../reducers/sessionReducer'
import loginService from '../services/login'
import sessionService from '../services/sessions'

import { FormRow, FormInput, FormLabel, StyledButton, SubPage } from '../globalStyles'
import { FormLogin, ErrorMessage } from './LoginForm.elements'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'musicappUserLoggedIn', JSON.stringify(user)
      )
      sessionService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(loginUser(user))
      dispatch(resetSession())

    } catch (exception) {
      setUsername('')
      setPassword('')
      setShowErrorMessage(true)
      setTimeout(() => setShowErrorMessage(false), 4000)
      console.log('login failed')
    }
  }

  return (
    <SubPage>
      <ErrorMessage>
        { showErrorMessage ? 'Login failed' : '' }
      </ErrorMessage>
      <FormLogin onSubmit={ handleLogin }>
        <FormRow>
          <FormLabel>username:</FormLabel>
          <FormInput
            id='username'
            type='text'
            value={ username }
            name='username'
            onChange={ ({ target }) => setUsername(target.value) }
          />
          <FormLabel>password:</FormLabel>
          <FormInput
            id='password'
            type='password'
            value={ password }
            name='password'
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </FormRow>
        <StyledButton id='login-button' type="submit">login</StyledButton>
      </FormLogin>
    </SubPage>
  )
}

export default LoginForm