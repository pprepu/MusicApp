import React, { useState } from 'react'
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux'
import { resetSession } from '../reducers/sessionReducer.js'
import { resetScales } from '../reducers/scaleReducer.js'
import { resetIntervals } from '../reducers/intervalReducer.js'

import { SubPage, Button } from '../globalStyles'
// import './SessionSummary.css'
import { Table, TableRow, TableText } from './SessionSummary.elements'

export const SummaryItem = ({ correct, answer, correctAnswer }) => {
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
                  <span style={(hover ? HoverTextVisible : HoverTextHidden)}>answer: {answer} - correct: {correctAnswer}</span>
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
                  <span style={(hover ? HoverTextVisible : HoverTextHidden)}>answer: {answer} - correct: {correctAnswer}</span>

            </div>
        )
    }
}

const SessionSummary = () => {
    const dispatch = useDispatch()
    const currentSession = useSelector(state => state.session)
    const currentScales = useSelector(state => state.scales)
    const currentIntervals = useSelector(state => state.intervals)

    const resetApp = () => {
        dispatch(resetSession())
        dispatch(resetScales())
        dispatch(resetIntervals())
    }

    // sama funktio kuin scalelistissä, vie johonki helperiin ja importaa näissä?
    const formatScale = scale => {
        let [bassNote,] = scale.split("-")
        bassNote = bassNote.replace('Sharp', '#')
        bassNote = Array.prototype.map.call(bassNote, (char, index) => index === 0 ? char.toUpperCase() : char)
        return bassNote.join("")
    }

    return (
        <SubPage>
            <Table>
                <TableRow header>
                    <TableText>Exercise information</TableText>
                </TableRow>
                <TableRow>
                    <TableText>Type</TableText>
                    <TableText>Interval identification</TableText>
                </TableRow>
                <TableRow>
                    <TableText>Score</TableText>
                    <TableText>
                        { currentSession.answersCorrect}/{currentSession.answersCorrect + currentSession.answersWrong } &nbsp;- &nbsp;
                        { Number(currentSession.answersCorrect)/(Number(currentSession.answersCorrect) + Number(currentSession.answersWrong)) * 100 }%
                    </TableText>
                </TableRow>
                <TableRow header>
                    <TableText>Settings</TableText>
                </TableRow>
                <TableRow>
                    <TableText>Clefs</TableText>
                    <TableText>Treble</TableText>
                </TableRow>
                <TableRow>
                    <TableText>Scales</TableText>
                    <TableText>
                        { currentScales.map((scale, i) => formatScale(scale) + (i !== currentScales.length - 1 ? ', ' : ''))}
                    </TableText>
                </TableRow>
                <TableRow>
                    <TableText>Intervals</TableText>
                    <TableText size={currentIntervals.length}>
                        { currentIntervals.map((interval, i) => interval + (i !== currentIntervals.length - 1 ? ', ' : ''))}
                    </TableText>
                </TableRow>
                <TableRow header last>
                    <TableText></TableText>
                </TableRow>
            </Table>
            {/* <Button onClick={() => console.log(currentScales)}>debug</Button> */}
        </SubPage>
    )
    // return (
    //     <div className='summary-container'>
    //         <p>
    //             Session details for intervals asked.
    //         </p>
    //         <p>
    //             Hover over boxes for additional information.
    //         </p>
    //         <div className='history-container'>
    //             {currentSession.sessionHistory.map((question, index) => 
    //                 <SummaryItem 
    //                     key={index} 
    //                     correct={question.answer === question.correctAnswer} 
    //                     answer={question.answer} 
    //                     correctAnswer={question.correctAnswer}
    //                 />
    //             )}
    //         </div>
    //         <div>
    //             <button onClick={() => resetApp()}>new session</button>
    //         </div>
    //     </div>
    // )
}

export default SessionSummary