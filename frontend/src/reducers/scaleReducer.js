//octaves?
export const initialState = []

const scaleReducer = (state = initialState, action) => {
    switch (action.type) {
        // should this be RESET_SCALES ?
        case 'RESET_SCALES':
            return initialState
        case 'ADD_SCALE':
            return [...state, action.data]
        case 'ADD_MULTIPLE':
            return [...state, ...action.data]
        case 'REMOVE_SCALE':
            return state.filter(scale => scale !== action.data)
        default:
            return state
    }
}

export const addScale = scale => {
    return {
        type: 'ADD_SCALE',
        data: scale
    }
}

export const addMultipleScales = scales => {
    return {
        type: 'ADD_MULTIPLE',
        data: scales
    }
}

export const removeScale = scale => {
    return {
        type: 'REMOVE_SCALE',
        data: scale
    }
}

export const resetScales = () => {
    return { type: 'RESET_SCALES' }
}

export default scaleReducer