import React, { useState } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import noteService from '../services/notes'
import intervalService from '../services/intervals'
import { answerCorrect, answerWrong, endSession } from '../reducers/sessionReducer.js'


import './IntervalContainer.css'

import images from '../services/images'


const IntervalContainer = () => {
    const [note1, setNote1] = useState('c_1')
    const [note2, setNote2] = useState('c_1')
    // currentScale käyttö, jotta sävelet samasta asteikosta vs randomizer kaikista valituista
    const [currentScale, setCurrentScale] = useState('c-maj')
    const [currentInterval, setCurrentInterval] = useState('')
    const [allIntervals, setAllIntervals] = useState([])
    const [answer, setAnswer] = useState(null)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [firstQuestion, setFirstQuestion] = useState(true)

    const currentSession = useSelector(state => state.session)
    const scalesInApp = useSelector(state => state.scales)
    const intervalsInApp = useSelector(state => state.intervals)
    const dispatch = useDispatch()

    const INTERVALS_PER_SESSION = 5

    // const setRandomNotes = () => {
    //     if (scalesInApp.length ===  0) {
    //       console.log('setRandomNotes() needs state.scales to not be empty')
    //       return 'No scales shown'
    //     }
    
    
    //     const randomScaleChosen = scalesInApp[Math.floor(Math.random() * Math.floor(scalesInApp.length))]
    //     setCurrentScale(randomScaleChosen)
    //     setNote1(noteService.getRandomNoteFromScale(randomScaleChosen))
    //     setNote2(noteService.getRandomNoteFromScale(randomScaleChosen))
    //   }

    // const findInterval = () => {
    //     if (note1 === '' || note2 === '' || currentScale === '') {
    //       return
    //     }
    
    //     setCurrentInterval(intervalService.findIntervalForMajor(note1, note2, currentScale))
        
    //   }
      
    //   const findAllIntervals = () => {
    //     if (!currentInterval) {
    //       return
    //     }

    //     setAllIntervals(intervalService.generateAllIntervals(currentInterval))
    //   }
      // tähän yhdistetty ylläolevat funktiot

      const askForInterval = () => {

        setAnswer(null)
        setHasAnswered(false)
        const randomScaleChosen = scalesInApp[Math.floor(Math.random() * Math.floor(scalesInApp.length))]
        // console.log(randomScaleChosen)
        setCurrentScale(randomScaleChosen)
        while (true) {
          const randomNote1 = noteService.getRandomNoteFromScale(randomScaleChosen)
          const randomNote2 = noteService.getRandomNoteFromScale(randomScaleChosen)
          const currentIntervalReceived = intervalService.findIntervalForMajor(randomNote1, randomNote2, randomScaleChosen)
          if (intervalsInApp.includes(currentIntervalReceived)) {
            setNote1(randomNote1)
            setNote2(randomNote2)
            setCurrentInterval(currentIntervalReceived)
            setAllIntervals(intervalService.generateAllIntervals(currentIntervalReceived, intervalsInApp))
            break
          }
        }
        

      }

      if (firstQuestion) {
        askForInterval()
        setFirstQuestion(false)
      }

      const giveAnswer = answer => {
        // console.log(answer, currentInterval)
        setHasAnswered(true)
        const answerData = {
          answer,
          correctInterval: currentInterval
        }
        if (answer === currentInterval) {
          dispatch(answerCorrect(answerData))
        } else {
          dispatch(answerWrong(answerData))
        }
        // console.log(currentSession.sessionHistory)
      }

    const modifyNoteName = note => {
      const [freq, octave] = note.split('_')
      return `${freq[0]}_${octave}`
    }

    const modifyScaleName = scale => {
      const [bass, type] = scale.split('-')
      return `${bass}_${type}`
    }
    
    return (
        <div className='interval-container'>
          <div className='session-container'>
            <p>Correct answers: {currentSession.answersCorrect} </p>
            <p>Wrong answers: {currentSession.answersWrong}</p>
          </div>
          <div className='image-container'>
            <img className='image-item image-item-1' src={images.clefs.g[modifyScaleName(currentScale)]} alt='c-maj' /><img className='image-item' src={images.notes[modifyNoteName(note1)]} alt='F-1' /><img className='image-item' src={images.notes[modifyNoteName(note2)]} alt='F-1' />
          </div>
          <div className='note-container'>
            <div>note 1: {note1}</div>
            <div>note 2: {note2}</div>
          </div>
            
          <div className='answer-container'>
              {allIntervals.map(interval => answer !== interval 
                ? <button className='answer-button' onClick={() => setAnswer(interval)} key={interval}>{interval}</button>
                : <button className='answer-button answer-button-answered' onClick={() => setAnswer(interval)} key={interval}>{interval}</button>)
              }
          </div>
            {hasAnswered 
              ? currentSession.answersCorrect + currentSession.answersWrong < INTERVALS_PER_SESSION 
                ? <button onClick={() => askForInterval()}>next Interval</button>
                : <button onClick={() => dispatch(endSession())}>end session</button>
              : answer && <button onClick={() => giveAnswer(answer)}>answer</button>
            }
            
        </div>
    )
}

export default IntervalContainer