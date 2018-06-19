import * as React from 'react'
import * as moment from 'moment'

import './Message.css'
import { IMessage } from '../../../models/message';
import { IUser } from '../../../models';

const Message = (props: { message: IMessage, selfMessage: boolean, user: IUser }) => {
    return (
        <li className='clearfix'>
            <div className={['message', props.selfMessage ? 'self' : ''].join(' ')}>
                <span className="username">
                    {props.user.name || ""}
                </span>
                <span className="date">
                    {moment(props.message.date).fromNow()}
                </span>
                <p className="content">
                    {props.message.content}
                </p>

            </div>
        </li>
    )
}

export default Message
