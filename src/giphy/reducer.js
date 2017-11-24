import { combineReducers } from 'redux'

import {
    FETCH_GIF_ERROR,
    FETCH_GIF_REQUEST,
    FETCH_GIF_SUCCESS,
    FETCH_GIFS_ERROR,
    FETCH_GIFS_REQUEST,
    FETCH_GIFS_SUCCESS,
    RESET,
    SET_KEYWORDS,
    SET_LIMIT,
} from './actions'

const keywordsReducer = (state = 'truck', action) => {
    if (action.type === SET_KEYWORDS) {
        return action.payload
    }
    
    return state
}

// Move logic of server response to actions (modify api middleware accordingly) to make these dummy reducers
const paginationReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_GIFS_SUCCESS:
            return action.payload.pagination
        case RESET:
            return {}
        default:
            return state
    }
}

const limitReducer = (state = 10, action) => {
    switch (action.type) {
        case SET_LIMIT:
            return action.payload
        default:
            return state
    }
}

const gifsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_GIFS_SUCCESS:
            return [
                ...state,
                ...action.payload.data
            ]
        case RESET:
            return []
        default:
            return state
    }
}

const activeReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_GIF_SUCCESS:
            return action.payload.data
        default:
            return state
    }
}

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case FETCH_GIFS_REQUEST:
        case FETCH_GIF_REQUEST:
            return true
        case FETCH_GIFS_SUCCESS:
        case FETCH_GIFS_ERROR:
        case FETCH_GIF_SUCCESS:
        case FETCH_GIF_ERROR:
            return false
        default:
            return state
    }
}

export default combineReducers({
    keywords: keywordsReducer,
    pagination: paginationReducer,
    limit: limitReducer,
    gifs: gifsReducer,
    active: activeReducer,
    loading: loadingReducer,
})
