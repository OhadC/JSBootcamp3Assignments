import * as React from "react"
import { Route, Redirect, Switch, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
const withRouterAsAny = withRouter as any

// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import * as actions from '../store/actions'
import { IState } from "../store/reducers"
import Tree from "./Tree/Tree"
import Board from "./Board/Board"
import LogIn from "../components/LogIn"

interface IProps {
    isAuthenticated: boolean
    login: any
}

class Main extends React.Component<IProps, {}> {
    public render() {
        const loginRoute = (props: any) => this.props.isAuthenticated ?
            <Redirect to={{ pathname: "/chat", state: { from: props.location } }} /> :
            <LogIn submit={this.props.login} />
        const authCheck = (props: any) => !this.props.isAuthenticated ?
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> : null

        return (
            <>
                <Switch>
                    <Route path="/login" exact={true} render={loginRoute} />
                    <Route path="/" render={authCheck} />
                </Switch>

                {/* <Header /> */}
                <main style={{ ...styles.main, ...styles.chat }}>
                    <Tree style={{ width: "25%", background: '#252839', color: 'white', overflow: 'hidden' }} />
                    <Board style={{ width: "75%", overflow: 'hidden' }} />
                </main>
                {/* <Footer /> */}
            </>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    main: {
        height: "100%",
        maxWidth: '100rem',
        margin: 'auto',
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    },
    chat: {
        flex: "1",
        display: "flex",
        flexDirection: "row"
    }
}

const mapStateToProps = (state: IState) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = {
    login: actions.login
}

export default withRouterAsAny(connect(mapStateToProps, mapDispatchToProps)(Main))
