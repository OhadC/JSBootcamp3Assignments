import * as React from 'react'

interface IProps {
    itemsType: "users" | "groups"
    onUsers: any
    onGroups: any
}

const SmallAdminPanel = (props: IProps) => {
    return (
        <div className="small-admin-panel">
            <button onClick={props.onUsers} className={props.itemsType === "users" ? "active" : undefined}>Users</button>
            <button onClick={props.onGroups} className={props.itemsType === "groups" ? "active" : undefined}>Groups</button>
        </div>
    )
}

export default SmallAdminPanel