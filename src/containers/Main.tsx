import * as React from "react"
import { Route, Redirect, Switch } from "react-router-dom";

// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import Tree from "./Tree/Tree"
import Board from "./Board/Board"
import LogIn from "../components/LogIn"
import * as AppStore from "../state/StateStore";

class Main extends React.Component<{}, {}> {
    componentDidMount() {
        AppStore.subscribe(this.updateApp)
    }

    updateApp = () => {
        this.forceUpdate()
    }

    loginHandler = (username: string, password: string) => {
        console.log(username, password)
    }

    public render() {
        const loginRoute = (props: any) => AppStore.appState.auth.isAuthenticated ?
            <Redirect to={{ pathname: "/chat", state: { from: props.location } }} /> :
            <LogIn submit={this.loginHandler} />
        const authCheck = (props: any) => !AppStore.appState.auth.isAuthenticated ?
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

export default Main
