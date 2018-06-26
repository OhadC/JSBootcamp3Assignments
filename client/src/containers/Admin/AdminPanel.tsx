import * as React from 'react'
import { connect } from 'react-redux'

import UserEdit from './components/UserEdit'
import { IAppState } from '../../store/reducers'
import { IClientGroup, IClientUser } from '../../models'
import * as actions from '../../store/actions'

interface IProps {
    style: React.CSSProperties
    itemsType: 'groups' | 'users'
    active: IClientGroup | IClientUser
    deleteUser: any
}

class AdminPanel extends React.Component<IProps, any> {
    render() {
        return (
            <div style={this.props.style}>
                <h1>
                    Admin Panel
            </h1>
                {this.props.itemsType === 'users' ? <UserEdit active={this.props.active} deleteUser={this.props.deleteUser} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    itemsType: state.tree.itemsType,
    active: state.tree.active
})

const mapDispatchToProps = {
    deleteUser: actions.deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
