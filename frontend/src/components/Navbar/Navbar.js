import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'

import {
  Nav,
  NavbarContainer,
  NavbarItem,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItemBtn,
  NavBtnLink
} from './Navbar.elements'
import { StyledButton } from '../../globalStyles'
import LoginForm from '../../components/LoginForm'

import { logoutUser } from '../../reducers/userReducer'
import { visitUserpage, resetSession, startSettings, visitLoginpage, visitSignup, visitAbout } from '../../reducers/sessionReducer'
import { resetScales } from '../../reducers/scaleReducer'
import { resetIntervals } from '../../reducers/intervalReducer'


const Navbar = () => {

  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)

  const showButton = () => {
    if (window.innerWidth >=960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const getDate = () => {
    return new Date().toDateString().split(' ').slice(1).join(' ')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('musicappUserLoggedIn')
    dispatch(resetSession())
  }

  const startPractice = () => {
    dispatch(resetSession())
    dispatch(resetScales())
    dispatch(resetIntervals())
    dispatch(startSettings())
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo onClick={() => dispatch(resetSession())}>
              <NavIcon />
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavbarItem>
                <NavLinks onClick={() => startPractice()}>
                                Practice
                </NavLinks>
              </NavbarItem>
              <NavbarItem>
                <NavLinks onClick={ () => dispatch(visitAbout()) }>
                                About
                </NavLinks>
              </NavbarItem>
              {user ? (
                <>
                  <NavbarItem>
                    <NavLinks onClick={() => dispatch(visitUserpage())}>
                                        User
                    </NavLinks>
                  </NavbarItem>
                  <NavbarItem>
                    <NavLinks onClick={() => handleLogout()}>
                                        Logout
                    </NavLinks>
                  </NavbarItem>
                </>
              ) : (
                <>
                  <NavbarItem>
                    <NavLinks onClick={() => dispatch(visitLoginpage())}>
                                        Login
                    </NavLinks>
                  </NavbarItem>

                  <NavItemBtn>
                    { button ? (
                      <NavBtnLink >
                        <StyledButton onClick={() => dispatch(visitSignup())} primary>Sign up</StyledButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink>
                        <StyledButton onClick={() => dispatch(visitSignup())} fontBig primary>
                                                Sign up
                        </StyledButton>
                      </NavBtnLink>
                    )
                    }
                  </NavItemBtn>
                </>
              )
              }
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar