import React, { useState } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'

import noteService from '../services/notes'
import intervalService from '../services/intervals'
import sessionService from '../services/sessions'

import { answerCorrect, answerWrong, endSession } from '../reducers/sessionReducer.js'

import { SubPage, Text, StyledButton } from '../globalStyles'
import { SessionContainer, ImageContainer, AnswerContainer, ImageItem, AnswerButton } from './IntervalContainer.elements'

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
  const user = useSelector(state => state.user)
  const scalesInApp = useSelector(state => state.scales)
  const intervalsInApp = useSelector(state => state.intervals)
  const dispatch = useDispatch()

  const INTERVALS_PER_SESSION = 2

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
      correctAnswer: currentInterval
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

  const finishSession = () => {
    if (user) {
      sessionService.create(currentSession)
        .then(res => dispatch(endSession()))
        .catch(err => console.log(err))
    } else {
      dispatch(endSession())
    }

  }

  return (
    <SubPage>
      <SessionContainer>
        <Text>Correct answers: {currentSession.answersCorrect} </Text>
        <Text>Wrong answers: {currentSession.answersWrong}</Text>
      </SessionContainer>
      <ImageContainer>
        <ImageItem src={images.clefs.g[modifyScaleName(currentScale)]} alt={ modifyScaleName(currentScale) } />
        <ImageItem src={images.notes[modifyNoteName(note1)]} alt={ modifyNoteName(note1) } />
        <ImageItem src={images.notes[modifyNoteName(note2)]} alt={ modifyNoteName(note2) } />
      </ImageContainer>
      <AnswerContainer>
        { allIntervals.map(interval =>
          <AnswerButton hasAnswered={hasAnswered}
            isCorrect={interval === currentInterval}
            userCorrect={answer === currentInterval}
            isToggled={answer === interval}
            onClick={() => setAnswer(interval)} key={interval}>
            {interval}
          </AnswerButton>
        )}
      </AnswerContainer>
      { hasAnswered
        ? currentSession.answersCorrect + currentSession.answersWrong < INTERVALS_PER_SESSION
          ? <StyledButton onClick={() => askForInterval()}>next Interval</StyledButton>
          : <StyledButton big fontBig onClick={() => finishSession()}>end session</StyledButton>
        : answer && <StyledButton onClick={() => giveAnswer(answer)}>answer</StyledButton>
      }

    </SubPage>
  )
}

export default IntervalContainer