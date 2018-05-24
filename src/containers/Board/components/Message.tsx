import * as React from 'react'

import './Message.css'

// interface IMessageProps {

// }

const Message = (props: any) => {
    return (
        <li className='clearfix'>
            <p className={['message', props.selfMessage ? 'self' : ''].join(' ')}>
                {props.content}
            </p>
        </li>
    )
}

export default Message
