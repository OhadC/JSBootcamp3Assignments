import * as React from "react"
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import SideHeader from "../../components/SideHeader"
import * as actions from "../../store/actions"
import { IAppState } from "../../store/reducers"
import { IClientUser } from "../../models"
import SmallAdminPanel from "./components/SmallAdminPanel"
import AdminPanel from "./AdminPanel"
import Tree from "../Tree/Tree"

interface IProps {
    user: IClientUser | null
    itemsType: 'groups' | 'users'
    login: any
    logout: any
    setTreeItemsType: any
}

class Admin extends React.Component<IProps, {}> {
    render() {
        return (
            <main style={styles.chat}>
                <section style={styles.leftSection} >
                    <SideHeader user={this.props.user} onLogout={this.props.logout} />
                    <Tree />
                    <SmallAdminPanel itemsType={this.props.itemsType} onGroups={this.props.setTreeItemsType.bind(this, 'groups')} onUsers={this.props.setTreeItemsType.bind(this, 'users')}/>
                </section>
                <AdminPanel style={styles.rightSection} />
            </main>
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
    itemsType: state.tree.itemsType
})

const mapDispatchToProps = {
    login: actions.login,
    logout: actions.logout,
    setTreeItemsType: actions.setTreeItemsType
}

export default (withRouter as any)(connect(mapStateToProps, mapDispatchToProps)(Admin))