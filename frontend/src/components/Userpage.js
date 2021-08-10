import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetSession } from '../reducers/sessionReducer'
import { resetScales } from '../reducers/scaleReducer.js'
import { resetIntervals } from '../reducers/intervalReducer.js'
import userService from '../services/users'
import generalService from '../services/general'
import { SubPage, Container, Text } from '../globalStyles'

import { Table, TableBody, TableRow, TableText } from './SessionSummary.elements'

// import './Userpage.css'
// import { SummaryItem } from './SessionSummary'

// const Session = ({ session, index }) => {
//     const [visible, setVisible] = useState(false)
//     return (
//         <div>
//             <h3>Session {index+1}:</h3>
//             <p>Correct: {session.answersCorrect}, Wrong: {session.answersWrong}</p>
//             <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show' }</button>
//             <div className='history-container'>
//                 {visible && session.sessionHistory.map((question, index) => 
//                     <SummaryItem 
//                         key={index} 
//                         correct={question.answer === question.correctAnswer} 
//                         answer={question.answer} 
//                         correctAnswer={question.correctAnswer}
//                     />
//                 )}
//             </div>
//         </div>
//     )
// }

const Userpage = () => {

    const [sessions, setSessions] = useState([])

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            return
        }
        userService.getUser(user.id).then(res => setSessions(res.sessions))
    }, [user, user.id])

    if (!user) {
        return
    }

    const resetApp = () => {
        dispatch(resetSession())
        dispatch(resetScales())
        dispatch(resetIntervals())
    }
    
    return (
        <SubPage>
            <Container>
                <Text>  
                    userpage?
                    <Table>
                        <TableBody>
                            <TableRow header>
                                <TableText>
                                    Sessions:
                                </TableText>
                            </TableRow>
                            { sessions.map(session => (
                                <TableRow>
                                    <TableText>
                                        { generalService.formatDate(session.date) }
                                    </TableText>
                                    <TableText>
                                        { session.sessionType }
                                    </TableText>
                                    <TableText>
                                        { session.answersCorrect } / { session.answersCorrect + session.answersWrong }
                                    </TableText>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Text>
            </Container>
        </SubPage>
    )
}

export default Userpage