import {
    SET_TAB,
} from './types.js'

const initialState = {
    tab: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB:
            return {
                ...state,
                tab: action.payload
            }
        default:
            return state
    }
}