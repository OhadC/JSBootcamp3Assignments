import * as React from 'react'

import Message from './Message/Message'

const ChatHistory = (props: any) => {
    const messagesElements = props.messages.map((message: any) =>
        <Message key={message.id} content={message.content} selfMessage={props.user === message.user} />
    )

    return (
        <ul style={{ ...props.style, listStyle: 'none', margin: '0', padding: '1em' }}>
            {messagesElements}
        </ul>
    )
}

export default ChatHistory
