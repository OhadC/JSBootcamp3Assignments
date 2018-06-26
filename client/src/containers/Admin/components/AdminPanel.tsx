import * as React from 'react'
import UserEdit from './UserEdit'

const AdminPanel = (props: any) => {
    return (
        <div style={props.style}>
            <h1>
                Admin Panel
            </h1>

            {props.itemsType === 'users' ? <UserEdit active={props.active} /> : null}
        </div>
    )
}

export default AdminPanel
