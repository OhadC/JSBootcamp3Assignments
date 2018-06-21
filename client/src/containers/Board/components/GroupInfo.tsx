import * as React from 'react'

import { IGroup, IUser } from "../../../models"
import './GroupInfo.css'

interface IProps {
    group: IGroup
}

const GroupInfo = (props: IProps) => {
    const usersList = props.group.users!.reduce((prev, user: IUser, idx: number) => {
        return prev + (idx > 0 ? ", " : "") + user.name
    }, "")

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
