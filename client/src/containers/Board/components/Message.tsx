import * as React from 'react'
import * as moment from 'moment'

import './Message.css'
import { IClientMessage } from '../../../models/message';
import { IClientUser } from '../../../models';

const Message = (props: { message: IClientMessage, selfMessage: boolean, user: IClientUser }) => {
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
