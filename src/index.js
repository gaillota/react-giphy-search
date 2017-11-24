import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './store/configureStore'
import App from './components/App'

import './index.css'

const history = createBrowserHistory()
const store = configureStore({}, history)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root'),
)
