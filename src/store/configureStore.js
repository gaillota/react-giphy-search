import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import createReducer from '../reducers'
import apiMiddleware from '../middlewares/api.middleware'

const appName = 'Giphy'

export default function configureStore(initialState = {}, history) {
    const logger = createLogger()
    const rootReducer = createReducer()
    
    // use Redux DevTools Chrome extension if available
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                name: appName,
            })
            : compose
    
    const middlewares = [
        routerMiddleware(history),
        apiMiddleware,
        thunk,
        logger,
    ]
    
    const enhancers = [
        applyMiddleware(...middlewares),
    ]
    
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            ...enhancers,
        ),
    )
}
