
const initialState = []

const intervalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_INTERVALS':
            return initialState
        case 'ADD_INTERVAL':
            return [...state, action.data]
        case 'ADD_MULTIPLE_INTERVALS':
            return [...state, ...action.data]
        case 'REMOVE_INTERVAL':
            return state.filter(interval => interval !== action.data)
        default:
            return state
    }
}

export const addInterval = interval => {
    return {
        type: 'ADD_INTERVAL',
        data: interval
    }
}

export const removeInterval = interval => {
    return {
        type: 'REMOVE_INTERVAL',
        data: interval
    }
}

export const addMultipleIntervals = intervals => {
    return {
        type: 'ADD_MULTIPLE_INTERVALS',
        data: intervals
    }
}
export const resetIntervals = () => {
    return { type: 'RESET_INTERVALS' }
}

export default intervalReducer