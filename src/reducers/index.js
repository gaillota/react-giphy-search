import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import loading from './loading'

import giphy from '../giphy/reducer'

export default function createReducer() {
    return combineReducers({
        router: routerReducer,
        
        loading,
        giphy,
    })
}
