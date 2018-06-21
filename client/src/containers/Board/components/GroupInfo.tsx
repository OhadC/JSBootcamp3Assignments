import * as React from 'react'

import { IGroup, IUser } from "../../../models"
import './GroupInfo.css'

interface IProps {
    group: IGroup
}

const GroupInfo = (props: IProps) => {
    const usersList = props.group.users!.map((user: IUser, idx: number) => (
        <span>
            {idx > 0 ? ', ' : ''}
            {user.name}
        </span>
    ))

    return (
        <div className="group-info">
            <h2>
                {props.group.name || 'Private Chat'}
            </h2>
            <p>
                {usersList}
            </p>
        </div>
    )
}

export default GroupInfo
