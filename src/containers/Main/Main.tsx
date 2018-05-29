import * as React from "react"
import { Route, Redirect, Switch } from "react-router-dom";

// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import Tree from "./components/Tree"
import Board from "../Board/Board"
import Login from "../Login"
import { AppStore, appState } from "../../state/StateStore";

class Main extends React.Component<{}, any> {
    state = {
        activeItem: null
    }

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
        const loginRoute = (props: any) => appState.auth.isAuthenticated ?
            <Redirect to={{ pathname: "/chat", state: { from: props.location } }} /> :
            <Login submit={this.loginHandler} />
        const authCheck = (props: any) => !appState.auth.isAuthenticated ?
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> : null

        return (
            <>
                <Switch>
                    <Route path="/login" exact={true} render={loginRoute} />
                    <Route path="/" render={authCheck} />
                </Switch>
                
                <main style={styles.main}>
                    {/* <Header /> */}
                    <div style={styles.chat}>
                        <Tree style={{ width: "25%" }} />
                        <Board style={{ width: "75%" }} />
                    </div>
                    {/* <Footer /> */}
                </main>
            </>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    main: {
        height: "100%",
        background: "#F2F5F8",
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
