import * as React from 'react'

import './SmallAdminPanel.css'

// interface IProps {
//     currentActive: string
//     onUsers: any
//     onGroups: any
// }

const SmallAdminPanel = (props: any) => {
    return (
        <div className="small-admin-panel">
            <button onClick={props.onUsers} className={props.currentActive ==="users" ? "active" : undefined}>Users</button>
            <button onClick={props.onGroups} className={props.currentActive === "groups" ? "active" : undefined}>Groups</button>
        </div>
    )
}

export default SmallAdminPanel