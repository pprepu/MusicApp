
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
        case 'VISIT_LOGINPAGE':
            return { ...state, currentPage: 'login' }
        case 'VISIT_SIGNUP':
            return { ...state, currentPage: 'signup' }
        case 'VISIT_ABOUT':
            return { ...state, currentPage: 'about'}
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

export const visitLoginpage = () => {
    return { type: 'VISIT_LOGINPAGE' }
}

export const visitSignup = () => {
    return { type: 'VISIT_SIGNUP' }
}

export const visitAbout = () => {
    return { type: 'VISIT_ABOUT' }
}

export default sessionReducer