import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import './App.css'
import ScaleList from './components/ScaleList'
import noteService from './services/notes'
import IntervalContainer from './components/IntervalContainer'
import SessionSummary from './components/SessionSummary'
import Frontpage from './components/Frontpage'
import { loginUser, logoutUser } from './reducers/userReducer'


const App = () => {
  // const [intervalMode, setIntervalMode] = useState(false)

  const user = useSelector(state => state.user)
  const currentSession = useSelector(state => state.session)
  // const choosableScales = ['c-maj', 'g-maj', 'd-maj', 'a-maj', 'f-maj', 'bb-maj', 'eb-maj', 'ab-maj']
  const choosableScales = [...noteService.getMajorScales(), 'flat-chrom']

  const dispatch = useDispatch()

  const getDate = () => {
    return new Date().toDateString().split(" ").slice(1).join(" ")
  }

  const mockLogin = () => {
    const mockUser = {
      username: 'Annika'
    }

    dispatch(loginUser(mockUser)) 
  }

  const mockLogout = () => {
    dispatch(logoutUser())
  }

  const handleLogin = () => {
    if (user) {
      mockLogout()
    } else {
      mockLogin()
    }
  }
  // return (
  //   <div>
  //     {intervalMode && <IntervalContainer />}
  //     {!intervalMode && <ScaleList scales={choosableScales} />}

  //     <div>
  //       {scalesInApp.length > 0 && <button onClick={() => setIntervalMode(!intervalMode)}> START </button>}
  //     </div>
  //   </div>
  // )

  return (
    <div className='App-container'>
      <div className='App'>
        <div className='menu-container'>
          <div className='menu'>
          <div className='date'>{getDate()}</div>
          <div className='links'>
            <div className='signup'>{user ? <p>{user.username}</p>: <p>Signup</p>}</div>
            <div className='login' onClick={() => handleLogin()}>{user ? <p>Logout</p>: <p>Login</p>}</div>
          </div>
          </div>
        </div>
        {currentSession.currentPage === 'front' && <Frontpage />}
        {currentSession.currentPage === 'intervalQuestions' && <IntervalContainer />}
        {currentSession.currentPage === 'intervalSettings' && <ScaleList scales={choosableScales} />}
        {currentSession.currentPage === 'intervalSummary' && <SessionSummary />}
        
        <div>
          <button className='debug-button' onClick={() => console.log(currentSession, user)}>debug</button>
        </div>
      </div>
    </div>
  )
}
/*
const App = () => {
  const [note1, setNote1] = useState('')
  const [note2, setNote2] = useState('')
  // currentScale käyttö, jotta sävelet samasta asteikosta vs randomizer kaikista valituista
  const [currentScale, setCurrentScale] = useState('')
  const [currentInterval, setCurrentInterval] = useState('')
  const [otherIntervals, setOtherIntervals] = useState([])

  const scalesInApp = useSelector(state => state.scales)
  const scales = ['c-maj', 'g-maj', 'd-maj', 'a-maj']

  const setRandomNotes = () => {
    if (scalesInApp.length ===  0) {
      console.log('setRandomNotes() needs state.scales to not be empty')
      return 'No scales shown'
    }


    const randomScaleChosen = scalesInApp[Math.floor(Math.random() * Math.floor(scalesInApp.length))]
    setCurrentScale(randomScaleChosen)
    setNote1(noteService.getRandomNoteFromScale(randomScaleChosen))
    setNote2(noteService.getRandomNoteFromScale(randomScaleChosen))
  }

  const findInterval = () => {
    if (note1 === '' || note2 === '' || currentScale === '') {
      return
    }

    setCurrentInterval(intervalService.findIntervalForMajor(note1, note2, currentScale))
    
  }
  
  const findOtherIntervals = () => {
    if (!currentInterval) {
      return
    }
    const otherIntervals = intervalService.generateAllIntervals(currentInterval)
    console.log(`other intervals received = ${otherIntervals}`)
    setOtherIntervals(otherIntervals)
  }

  return (
    <div>
      <ScaleList scales={scales} />
      <button onClick={() => console.log(`scales atm: ${scalesInApp}`)}>scales atm?</button>
      <div>scales atm: {scalesInApp}</div>
      <div>
        <div>notes from scale: {currentScale}</div>
        note 1: {note1}   note 2: {note2}   
        <button onClick={() => setRandomNotes()}>set notes</button>
      </div>
      <div>
        <button onClick={() => findInterval()}>find Interval</button>
        current interval: {currentInterval}
        <button onClick={() => findOtherIntervals()}>find other intervals</button>
        other intervals: {otherIntervals}
      </div>
    </div>
  )
}
*/
export default App
