import * as React from 'react'
import * as moment from 'moment'

import './Message.css'
import { IMessage } from '../../../models/message';

const Message = (props: { message: IMessage, selfUserId: string }) => {
    const selfMessage = props.selfUserId === props.message.user.id
    return (
        <li className='clearfix'>
            <div className={['message', selfMessage ? 'self' : ''].join(' ')}>
                <span className="username">
                    {props.message.user.name}
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
