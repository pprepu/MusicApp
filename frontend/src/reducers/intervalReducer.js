//octaves?
const initialState = []

const intervalReducer = (state = initialState, action) => {
    switch (action.type) {
        // should this be RESET_INTERVALS ?
        case 'RESET_INTERVALS':
            return initialState
        case 'ADD_INTERVAL':
            return [...state, action.data]
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

export const resetIntervals = () => {
    return { type: 'RESET_INTERVALS' }
}

export default intervalReducer