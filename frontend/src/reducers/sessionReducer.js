
// vastaukset vois olla taulukkoja, joissa intervallit
// currentAnswer(s)?
//intervallijutut täällä vai komponenttien usestates?
/*
export const initialSession = {
    answersCorrect: 0,
    answersWrong: 0,
    currentInterval: '',
    intervalsShown: [],
    notes: [],
    sessionHasStarted: false
}
*/
// export const initialSession = {
//     answersCorrect: 0,
//     answersWrong: 0,
//     sessionHasStarted: false,
//     sessionHasEnded: false,
//     sessionHistory: []
// }

// // add RESET_ANSWERS?
// const sessionReducer = (state = initialSession, action) => {
//     switch (action.type) {
//         case 'ADD_CORRECT':
//             return { ...state, answersCorrect: state.answersCorrect + 1, sessionHistory: state.sessionHistory.concat(action.data) }
//         case 'ADD_WRONG':
//             return { ...state, answersWrong: state.answersWrong + 1, sessionHistory: state.sessionHistory.concat(action.data) }
//         case 'RESET_SESSION':
//             return initialSession
//         case 'START_SESSION':
//             return { ...state, sessionHasStarted: true}
//         case 'END_SESSION':
//             return { ...state, sessionHasEnded: true }
//         default:
//             return state
//     }
// }

export const initialSession = {
    sessionType: 'interval',
    answersCorrect: 0,
    answersWrong: 0,
    currentPage: 'front',
    sessionHistory: []
}

// add RESET_ANSWERS?
const sessionReducer = (state = initialSession, action) => {
    switch (action.type) {
        case 'ADD_CORRECT':
            return { ...state, answersCorrect: state.answersCorrect + 1, sessionHistory: state.sessionHistory.concat(action.data) }
        case 'ADD_WRONG':
            return { ...state, answersWrong: state.answersWrong + 1, sessionHistory: state.sessionHistory.concat(action.data) }
        case 'RESET_SESSION':
            return initialSession
        case 'START_SETTINGS':
            return { ...state, currentPage: 'intervalSettings' }
        case 'START_SESSION':
            return { ...state, currentPage: 'intervalQuestions' }
        case 'END_SESSION':
            return { ...state, currentPage: 'intervalSummary' }
        case 'VISIT_USERPAGE':
            return { ...state, currentPage: 'userPage' }
        default:
            return state
    }
}

export const startSettings = () => {
    return { type: 'START_SETTINGS' }
}

export const startSession = () => {
    return { type: 'START_SESSION' }
}

export const endSession = () => {
    return { type: 'END_SESSION' }
}

export const answerCorrect = data => {
    return { type: 'ADD_CORRECT', data }
}

export const answerWrong = data => {
    return { type: 'ADD_WRONG', data }
}

export const resetSession = () => {
    return { type: 'RESET_SESSION' }
}

export const visitUserpage = () => {
    return { type: 'VISIT_USERPAGE' }
}



export default sessionReducer