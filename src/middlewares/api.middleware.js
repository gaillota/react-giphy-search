// This middleware is based on redux-api-middleware (see https://github.com/agraboso/redux-api-middleware)
// but with some slight adjustments
import axios from 'axios'

import validateObject from '../utils/validate-object'

// String key that carries API call info interpreted by this Redux middleware.
export const RSAA = '@@redux-api-middleware/RSAA'

function isValidApiCallAction(action) {
    const requiredKeys = {
        endpoint: ['string', 'function'],
        types: ['array'],
    }
    
    return typeof action[RSAA] === 'object' && validateObject(action[RSAA], requiredKeys)
}

function normalizeAction(action) {
    if (typeof action === 'string' || typeof action === 'symbol') {
        return {
            type: action,
        }
    }
    
    return action
}

function normalizeActionTypes(types) {
    if (!Array.isArray(types)) {
        return types
    }
    
    const defaultSuccessPayload = (action, state, response) => response.data
    const defaultErrorPayload = (action, state, error) => error.response
    let [requestAction, successAction, errorAction] = types
    
    requestAction = normalizeAction(requestAction)
    
    successAction = {
        payload: defaultSuccessPayload,
        ...normalizeAction(successAction)
    }
    
    errorAction = {
        payload: defaultErrorPayload,
        ...normalizeAction(errorAction)
    }
    
    return [requestAction, successAction, errorAction]
}

export default ({ dispatch, getState }) => next => async action => {
    if (!isValidApiCallAction(action)) {
        return next(action)
    }
    
    const {
        // Required stuff
        endpoint: url,
        types,
        
        // Optional stuff
        method = 'GET',
        body: data,
        headers,
        options,
        credentials,
        baseURL,
        params,
        responseType = 'json',
    } = action[RSAA]
    const [requestType, successType, errorType] = normalizeActionTypes(types)
    const state = getState()
    
    dispatch(requestType)
    
    try {
        const response = await axios({
            url,
            method,
            baseURL,
            headers,
            params,
            data,
            options,
            credentials,
            responseType,
        })
    
        dispatch({
            ...successType,
            payload: successType.payload(state, action, response),
        })
    } catch (error) {
        dispatch({
            ...errorType,
            payload: errorType.payload(state, action, error),
        })
    }
}
