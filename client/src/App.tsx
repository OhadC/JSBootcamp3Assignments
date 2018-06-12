import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Main from './containers/Main'

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Main />
            </ BrowserRouter>
        )
    }
}

export default App
