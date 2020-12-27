import {
    SET_TAB,
} from './types.js'

export const setTab = (index) => {
    return (dispatch) => {
        dispatch({
            type: SET_TAB,
            payload: index
        })
    }
}