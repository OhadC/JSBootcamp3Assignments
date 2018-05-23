import * as React from 'react'

import Message from './Message/Message'

const ChatHistory = (props: any) => {
    const messagesElements = props.messages.map((message: any) =>
        <Message key={message.id} content={message.content} selfMessage={props.user === message.user} />
    )

    return (
        <ul style={{ ...props.style, ...chatHistoryStyle }}>
            {messagesElements}
        </ul>
    )
}

const chatHistoryStyle: object = { 
    listStyle: 'none', 
    margin: '0', 
    padding: '1em', 
    overflowY: 'auto',
    // background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/gaming-pattern.png")',
}

export default ChatHistory
