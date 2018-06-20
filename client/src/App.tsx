import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router'
const withRouterAsAny = withRouter as any

import Chat from './containers/Chat/Chat'
import { IAppState } from './store/reducers'

interface IProps {
    isAuthenticated: boolean
}

class App extends React.Component<IProps, {}> {
    render() {
        const authRouts = () => (
            <Switch>
                <Route path="/chat" render={Chat} />
                <Route path="/admin" render={Chat/*Admin*/} />
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
            <div style={styles.app}>
                {this.props.isAuthenticated ? authRouts() : notAuthRouts()}
            </div>
        )
    }
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

const mapStateToProps = (state: IAppState) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default withRouterAsAny(connect(mapStateToProps)(App))
