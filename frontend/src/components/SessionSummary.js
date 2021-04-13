import React, { useState } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import { resetSession } from '../reducers/sessionReducer.js'
import { resetScales } from '../reducers/scaleReducer.js'
import { resetIntervals } from '../reducers/intervalReducer.js'

import './SessionSummary.css'

const SummaryItem = ({ correct, answer, correctInterval }) => {
    const [hover, setHover] = useState(false)
    const HoverTextVisible = {
        visibility: 'visible',
        fontSize: '8px',
        position: 'absolute',
        width: '100px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-50px', /* Use half of the width, to center the tooltip */
    }

    const HoverTextHidden = {
        visibility: 'hidden',
    }

    if (correct) {
        return (
            <div 
            
              onMouseEnter={()=>{
                setHover(true);
              }}
              onMouseLeave={()=>{
                setHover(false);
              }}
              
              className='history-item history-item-correct'>
                  <span style={(hover ? HoverTextVisible : HoverTextHidden)}>answer: {answer} - correct: {correctInterval}</span>
            </div>
        )
    } else {
        return (
            <div 
            
              onMouseEnter={()=>{
                setHover(true);
              }}
              onMouseLeave={()=>{
                setHover(false);
              }}
              className='history-item history-item-incorrect'>
                  <span style={(hover ? HoverTextVisible : HoverTextHidden)}>answer: {answer} - correct: {correctInterval}</span>

            </div>
        )
    }
}

const SessionSummary = () => {
    const dispatch = useDispatch()
    const currentSession = useSelector(state => state.session)

    const resetApp = () => {
        dispatch(resetSession())
        dispatch(resetScales())
        dispatch(resetIntervals())
    }
    return (
        <div className='summary-container'>
            <p>
                Session details for intervals asked.
            </p>
            <p>
                Hover over boxes for additional information.
            </p>
            <div className='history-container'>
                {currentSession.sessionHistory.map((question, index) => 
                    <SummaryItem 
                        key={index} 
                        correct={question.answer === question.correctInterval} 
                        answer={question.answer} 
                        correctInterval={question.correctInterval}
                    />
                )}
            </div>
            <div>
                <button onClick={() => resetApp()}>new session</button>
            </div>
        </div>
    )
}

export default SessionSummary