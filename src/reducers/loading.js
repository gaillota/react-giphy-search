import { createAction } from 'redux-actions'

export const LOADING = 'LOADING' // Move somewhere else + rename ?

export const setLoading = (isLoading) => createAction(LOADING)(isLoading)

export default function loadingReducer(state = false, action) {
    if (action.type === LOADING) {
        return action.payload
    }
    
    return state
}
