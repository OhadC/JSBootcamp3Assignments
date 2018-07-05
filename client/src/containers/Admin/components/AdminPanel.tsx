import * as React from 'react'
import { IClientGroup, IClientUser } from '../../../models'
import GroupEdit from './GroupEdit'
import UserEdit from './UserEdit';

interface IProps {
    style: React.CSSProperties
    editMode: 'groups' | 'users'
    editedItem: IClientGroup | IClientUser
}

const AdminPanel: React.SFC<IProps> = props => {
    return (
        <div style={props.style}>
            <h1>
                Admin Panel
            </h1>
            {props.editedItem && props.editMode === 'groups' && <GroupEdit />}
            {props.editedItem && props.editMode === 'users' && <UserEdit />}
        </div>
    )
}

export default AdminPanel
