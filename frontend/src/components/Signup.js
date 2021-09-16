import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import userService from '../services/users'
import sessionService from '../services/sessions'
import { visitLoginpage } from '../reducers/sessionReducer'

import { FormRow, FormInput, FormLabel, SubPage } from '../globalStyles'
import { SignupButton, ErrorText, TextDescription } from './Signup.elements'
import { FormLogin } from './LoginForm.elements'

const Signup = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [name, setName] = useState('')
    const [showErrorText, setShowErrorText] = useState(false)

    const handleSignup = async event => {
        event.preventDefault()
        console.log('username', username, 'password', password)

        try {
            const userCreated = await userService.createUser({
              username, name, password
            })

            dispatch(visitLoginpage())
            
          } catch (exception) {
            setUsername('')
            if (exception.response.data.error.startsWith(
                'User validation failed: username: Error, expected `username` to be unique.')
            ) {
                setShowErrorText(true)
                setTimeout(() => setShowErrorText(false), 4000)
            }
            
          }
        
    }

    return (
        <SubPage>
          <FormLogin onSubmit={ handleSignup }>
            <FormRow hasErrorText>
              <FormLabel>username: <TextDescription>(at least 3 chars)</TextDescription></FormLabel>
              <FormInput 
                type='text'
                value={ username }
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormRow>
            <FormRow hasErrorText>
                <FormLabel></FormLabel>
                <ErrorText> 
                    { showErrorText ? 'Username is already taken' : '' }
                </ErrorText> 
            </FormRow>
            <FormRow>
              <FormLabel>name: <TextDescription>(optional)</TextDescription> </FormLabel>
              <FormInput 
                type='name'
                value={ name }
                name='Name'
                onChange={({ target }) => setName(target.value)}
              />
            </FormRow>
            <FormRow>
              <FormLabel>password: <TextDescription>(at least 5 chars)</TextDescription></FormLabel>
              <FormInput 
                type='password'
                value={ password }
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormRow>
              <SignupButton 
                disabled={ username.length < 3 || password.length < 5 } 
                type="submit">
                    Sign up
              </SignupButton>
          </FormLogin>       
        </SubPage>
    )    

}

export default Signup