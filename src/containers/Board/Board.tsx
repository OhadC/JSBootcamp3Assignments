import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import * as MessagesReducer from '../../state/MessagesReducer';

const Board = (props: { style: React.CSSProperties }) => {
    const addMessageHandler = (messageContent: string) => {
        MessagesReducer.addMessage(messageContent, MessagesReducer.echoMessage.bind(null, messageContent))
    }

    return (
        <section style={{ ...props.style, ...boardStyle }}>
            <ChatHistory style={{ flex: '1' }} />
            <MessageInput addMessage={addMessageHandler} />
        </section>
    )

}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board
