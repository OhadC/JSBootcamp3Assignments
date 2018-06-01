import * as React from 'react'
import * as moment from 'moment'

import './Message.css'

const Message = (props: any) => {
    const selfMessage = props.selfUserId === props.message.userId
    return (    // TODO: name, date
        <li className='clearfix'>
            <div className={['message', selfMessage ? 'self' : ''].join(' ')}>
                <span className="username">
                    User Name
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
