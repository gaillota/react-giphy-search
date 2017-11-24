import { createAction } from 'redux-actions'

import config from '../config/config'
import {
    FETCH_GIF_ERROR,
    FETCH_GIF_REQUEST,
    FETCH_GIF_SUCCESS,
    FETCH_GIFS_ERROR,
    FETCH_GIFS_REQUEST,
    FETCH_GIFS_SUCCESS,
    RESET,
    SET_KEYWORDS,
} from './actions'
import { RSAA } from '../middlewares/api.middleware'

export const setKeywords = createAction(SET_KEYWORDS)
export const reset = createAction(RESET)

export const paginate = (page) => (dispatch, getState) => {
    const state = getState()
    const { keywords, pagination, limit } = state.giphy
    const { count = 0, offset: lastOffset = 0 } = pagination
    const offset = page ? page * limit  : (count + lastOffset || 0)
    
    // Quick fix for component re-mount on route back
    if (page === 1) {
        dispatch(reset())
    }
    
    return dispatch({
        [RSAA]: {
            baseURL: 'http://api.giphy.com',
            endpoint: '/v1/gifs/search',
            params: {
                api_key: config.giphy.api_key,
                q: keywords,
                limit,
                offset,
            },
            types: [FETCH_GIFS_REQUEST, FETCH_GIFS_SUCCESS, FETCH_GIFS_ERROR],
        },
    })
}

export const fetchById = (id) => (dispatch, getState) => {
    const state = getState()
    const gif = state.giphy.gifs.find(gif => gif.id === id)
    
    if (gif) {
        // If state already has gif, no need to fetch it from server
        // Simulating response from server
        return dispatch({
            type: FETCH_GIF_SUCCESS,
            payload: {
                data: gif,
            },
        })
    }
    
    return dispatch({
        [RSAA]: {
            baseURL: 'http://api.giphy.com',
            endpoint: `v1/gifs/${id}`,
            params: {
                api_key: config.giphy.api_key,
            },
            types: [FETCH_GIF_REQUEST, FETCH_GIF_SUCCESS, FETCH_GIF_ERROR],
        },
    })
}
