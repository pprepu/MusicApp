import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import loginService from '../services/login'
import sessionService from '../services/sessions'
import './LoginForm.css'

const LoginForm = () => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

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
          
        } catch (exception) {
          setUsername('')
          setPassword('')
          console.log('login failed')
        }
      }

      return (
          <div className='login-container'>
            <form onSubmit={handleLogin}>
                <div className='login-item'>
                    username
                    <input
                        type='text'
                        value={ username }
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className='login-item'>
                    password
                    <input
                        type='password'
                        value={ password }
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>       
          </div>
      )
}

export default LoginForm