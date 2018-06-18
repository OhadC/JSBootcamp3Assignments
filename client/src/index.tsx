import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css/normalize.css'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'

ReactDOM.render(
  // <Provider>
    <BrowserRouter>
      <App />
    </ BrowserRouter>
  // </Provider>
  , document.getElementById('root') as HTMLElement
)
