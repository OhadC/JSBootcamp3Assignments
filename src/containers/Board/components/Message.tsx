import * as React from 'react'

import './Message.css'

const Message = (props: any) => {
    const selfMessage = props.selfUserId === props.message.userId
    return (    // TODO: name, date
        <li className='clearfix'>
            <p className={['message', selfMessage ? 'self' : ''].join(' ')}>
                {props.message.content}
            </p>
        </li>
    )
}

export default Message
