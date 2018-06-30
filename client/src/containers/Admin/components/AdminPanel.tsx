import * as React from 'react'
import { IClientGroup, IClientUser } from '../../../models'
import GroupEdit from './GroupEdit'
import UserEdit from './UserEdit';

interface IProps {
    style: React.CSSProperties
    itemsType: 'groups' | 'users'
    editedItem: IClientGroup | IClientUser
}

const AdminPanel = (props: IProps) => {
    return (
        <div style={props.style}>
            <h1>
                Admin Panel
            </h1>
            {props.editedItem && props.itemsType === 'groups' && <GroupEdit />}
            {props.editedItem && props.itemsType === 'users' && <UserEdit />}
        </div>
    )
}

export default AdminPanel
