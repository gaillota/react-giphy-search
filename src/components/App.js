import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './Layout'
import * as Gifs from '../giphy/pages/index'
import NotFound from './NotFound'

const App = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Gifs.Search}/>
                    <Route path='/:gifId' component={Gifs.Details}/>
                    <Route path="" component={NotFound}/>
                </Switch>
            </Layout>
        </div>
    )
}

export default App
