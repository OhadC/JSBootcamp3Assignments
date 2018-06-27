import * as React from 'react'
import { connect } from 'react-redux'

import { IAppState } from '../../store/reducers'
import { IClientGroup, IClientUser } from '../../models'
import * as actions from '../../store/actions'
import GroupEdit from './components/GroupEdit'

interface IProps {
    style: React.CSSProperties
    itemsType: 'groups' | 'users'
    editedItem: IClientGroup | IClientUser
    deleteUser: any
    updateGroup: any
    deleteGroup: any
}

class AdminPanel extends React.Component<IProps, any> {

    render() {
        const { editedItem, updateGroup, deleteGroup } = this.props
        return (
            <div style={this.props.style}>
                <h1>
                    Admin Panel
            </h1>
                {editedItem && <GroupEdit editedItem={editedItem} updateGroup={updateGroup} deleteGroup={deleteGroup} />}
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    itemsType: state.tree.itemsType,
    editedItem: state.tree.active
})

const mapDispatchToProps = {
    deleteUser: actions.deleteUser,
    updateGroup: actions.updateGroup,
    deleteGroup: actions.deleteGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)
