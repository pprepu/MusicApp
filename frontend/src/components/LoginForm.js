import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { resetSession } from '../reducers/sessionReducer'
import loginService from '../services/login'
import sessionService from '../services/sessions'

import { FormRow, FormInput, FormLabel, StyledButton, SubPage } from '../globalStyles'
import { FormLogin, ErrorMessage } from './LoginForm.elements'
// import { ErrorText } from './Signup.elements'
// import './LoginForm.css'

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
          <FormLogin onSubmit={handleLogin}>
            <FormRow>
              <FormLabel>username:</FormLabel>
              <FormInput 
                type='text'
                value={ username }
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
              <FormLabel>password:</FormLabel>
              <FormInput 
                type='password'
                value={ password }
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormRow>
              <StyledButton type="submit">login</StyledButton>
          </FormLogin>       
        </SubPage>
    )
      // return (
      //     <div className='login-container'>
      //       <form onSubmit={handleLogin}>
      //           <div className='login-item'>
      //               username
      //               <input
      //                   type='text'
      //                   value={ username }
      //                   name='Username'
      //                   onChange={({ target }) => setUsername(target.value)}
      //               />
      //           </div>
      //           <div className='login-item'>
      //               password
      //               <input
      //                   type='password'
      //                   value={ password }
      //                   name='Password'
      //                   onChange={({ target }) => setPassword(target.value)}
      //               />
      //           </div>
      //           <button type="submit">login</button>
      //       </form>       
      //     </div>
      // )
}

export default LoginForm