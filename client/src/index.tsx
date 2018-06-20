import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import App from './App'
import { store, history } from './store'

import 'normalize.css/normalize.css'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ ConnectedRouter>
    </Provider>
    , document.getElementById('root') as HTMLElement
)
