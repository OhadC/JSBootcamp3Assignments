import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

import 'normalize.css/normalize.css'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </ BrowserRouter>
    </Provider>
    , document.getElementById('root') as HTMLElement
)
