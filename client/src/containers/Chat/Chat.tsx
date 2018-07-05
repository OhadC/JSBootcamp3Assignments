import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from "../../store/reducers"
import Tree from "../Tree/Tree"
import Board from "./../Board/Board"
import LogIn from "../../components/LogIn"
import { IClientUser } from "../../models"
import SideHeader from "../../components/SideHeader"

interface IProps {
    isAuthenticated: boolean
    user: IClientUser | null
    login: any
    logout: any
}

const Chat: React.SFC<IProps> = props => {
    const login = () => <LogIn submit={props.login} />

    return (
        <>
            <Route path="/login" exact={true} render={login} />

            <main style={styles.chat}>
                <section style={styles.leftSection} >
                    <SideHeader user={props.user} onLogout={props.logout} />
                    <Tree />
                </section>
                <Board style={styles.rightSection} />
            </main>
        </>
    )
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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    },
    rightSection: {
        width: "75%",
        overflow: 'hidden'
    }
}

const mapStateToProps = (state: IAppState) => ({
    user: state.global.user,
    isAuthenticated: !!state.auth.token,
})

const mapDispatchToProps = {
    login: actions.login,
    logout: actions.logout
}

export default (withRouter as any)(connect(mapStateToProps, mapDispatchToProps)(Chat))
