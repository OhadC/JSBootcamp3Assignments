import * as React from "react"
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import SideHeader from "../../components/SideHeader"
import AdminTree from "./components/adminTree"
import SmallAdminPanel from "./components/SmallAdminPanel"
import AdminPanel from "./components/AdminPanel"
import * as actions from "../../store/actions"
import { IAppState } from "../../store/reducers"
import { IClientUser, IClientGroup } from "../../models"
import './Admin.css'

interface IProps {
    user: IClientUser | null
    editMode: 'groups' | 'users'
    editedItem: IClientUser | IClientGroup
    login: any
    logout: any
    setEditMode: any
}

class Admin extends React.Component<IProps, {}> {
    componentDidMount() {
        this.props.setEditMode('groups')
    }
    render() {
        return (
            <main style={styles.chat}>
                <section style={styles.leftSection} >
                    <SideHeader user={this.props.user} onLogout={this.props.logout} />
                    <AdminTree />
                    <SmallAdminPanel editMode={this.props.editMode} onGroups={this.props.setEditMode.bind(this, 'groups')} onUsers={this.props.setEditMode.bind(this, 'users')} />
                </section>
                <AdminPanel style={styles.rightSection} editMode={this.props.editMode} editedItem={this.props.editedItem} />
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
    editMode: state.admin.editMode,
    editedItem: state.admin.editedItem
})

const mapDispatchToProps = {
    login: actions.login,
    logout: actions.logout,
    setEditMode: actions.setAdminEditMode
}

export default (withRouter as any)(connect(mapStateToProps, mapDispatchToProps)(Admin))