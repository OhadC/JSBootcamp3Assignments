import * as React from 'react'

import { IClientGroup, IClientUser } from "../../../models"
import './GroupInfo.css'

interface IProps {
    group: IClientGroup
    selfUserId: string
    onUserClicked: any
}

const GroupInfo = (props: IProps) => {
    let toList
    if (props.group.isPrivate) {
        toList = (user: IClientUser) => {
            return (
                <li key={user._id}>
                    <span>{user.name}</span>
                </li>
            )
        }
    } else {
        toList = (user: IClientUser) => {
            if (props.selfUserId !== user._id)
                return (
                    <li key={user._id}>
                        <button onClick={props.onUserClicked.bind(null, user._id)}>{user.name}</button>
                    </li>
                )
            else return (
                <li key={user._id}>
                    <span>You</span>
                </li>
            )
        }
    }

    return (
        <div className="group-info">
            <h2>
                {props.group.isPrivate && 'Private Chat with '}
                {props.group.name || ''}
            </h2>
            <ul className="inline-list">
                {props.group.users && props.group.users.map(toList)}
            </ul>
        </div>
    )
}

export default GroupInfo
