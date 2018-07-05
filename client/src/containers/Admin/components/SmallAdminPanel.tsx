import * as React from 'react'

interface IProps {
    editMode: "users" | "groups"
    onUsers: any
    onGroups: any
}

const SmallAdminPanel: React.SFC<IProps> = props => {
    return (
        <div className="small-admin-panel">
            <button onClick={props.onUsers} className={props.editMode === "users" ? "active" : undefined}>Users</button>
            <button onClick={props.onGroups} className={props.editMode === "groups" ? "active" : undefined}>Groups</button>
        </div>
    )
}

export default SmallAdminPanel