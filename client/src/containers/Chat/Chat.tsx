import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from "../../store/reducers"
import Tree from "./../Tree/Tree"
import Board from "./../Board/Board"
import LogIn from "../../components/LogIn"
import { IClientUser } from "../../models"
import SideHeader from "./components/SideHeader"

interface IProps {
    isAuthenticated: boolean
    user: IClientUser | null
    login: any
    logout: any
}

class Chat extends React.Component<IProps, {}> {
    public render() {
        const login = (props: any) => <LogIn submit={this.props.login} />

        return (
            <>
                <Route path="/login" exact={true} render={login} />

                <main style={styles.chat}>
                    <section style={styles.leftSection} >
                        <SideHeader user={this.props.user} onLogout={this.props.logout} />
                        <Tree style={{}} />
                    </section>
                    <Board style={styles.rightSection} />
                </main>
            </>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    chat: {
        flex: "1",
        display: "flex",
        flexDirection: "row"
    },
    leftSection: {
        width: "25%",
        background: '#252839',
        color: 'white',
        overflow: 'hidden'
    },
    rightSection: {
        width: "75%",
        overflow: 'hidden'
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        user: state.global.user,
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = {
    login: actions.login,
    logout: actions.logout
}

export default (withRouter as any)(connect(mapStateToProps, mapDispatchToProps)(Chat))
