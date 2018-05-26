import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'

const Board = (props: any) => {
    return (
        <section style={{ ...props.style, ...boardStyle }}>
            <ChatHistory style={{ flex: '1' }} user='one' />
            <MessageInput />
        </section>
    )
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board
