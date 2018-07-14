import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IAppState } from './store/reducers'
import { isAuthenticatedSelector } from './store/selectors/auth'
import Chat from './containers/Chat/Chat'
import Admin from './containers/Admin/Admin'
import Loading from './components/Loading'

interface IProps {
    isAuthenticated: boolean
}

const App: React.SFC<IProps> = props => {
    const authRouts = () => (
        <Switch>
            <Route path="/chat" render={Chat} />
            <Route path="/admin" render={Admin} />
            <Redirect to='/chat' />
        </Switch>
    )
    const notAuthRouts = () => (
        <Switch>
            <Route path="/login" exact={true} render={Chat} />
            <Redirect to='/login' />
        </Switch>
    )

    return (
        <>
            <Loading />
            <ToastContainer newestOnTop={true} />
            <main style={styles.app}>
                {props.isAuthenticated ? authRouts() : notAuthRouts()}
            </main>
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    app: {
        height: "100%",
        maxWidth: '100rem',
        margin: 'auto',
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    }
}

const mapStateToProps = (state: IAppState) => ({
    isAuthenticated: isAuthenticatedSelector(state)
})

export default (withRouter as any)(connect(mapStateToProps)(App))
