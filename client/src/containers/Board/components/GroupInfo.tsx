import * as React from 'react'

import { IClientGroup, IClientUser } from "../../../models"
import './GroupInfo.css'

interface IProps {
    group: IClientGroup
    selfUserId: string
    onUserClicked: any
}

const GroupInfo = (props: IProps) => {
    // const usersList = props.group.users && props.group.users.reduce((prev, user: IClientUser, idx: number) => {
    //     return prev + (idx > 0 ? ", " : "") + <button> user.name </button>
    // }, "")
    let toList
    if (props.group.isPrivate) {
        toList = (user: IClientUser) => {
            return <span key={user._id}> {user.name} </span>
        }
    } else {
        toList = (user: IClientUser) => {
            if (props.selfUserId !== user._id)
                return <button key={user._id} onClick={props.onUserClicked.bind(null, user._id)}> {user.name} </button>
            else return <span key={user._id} > you </span>
        }
    }

    return (
        <div className="group-info">
            <h2>
                {props.group.isPrivate && 'Private Chat with '}
                {props.group.name || ''}
            </h2>
            <p>
                {props.group.users && props.group.users.map(toList)}
            </p>
        </div>
    )
}

export default GroupInfo
