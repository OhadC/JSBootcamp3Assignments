import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import * as MessagesReducer from '../../state/MessagesReducer';

class Board extends React.Component<any, {}> {
    addMessageHandler = (messageContent: string) => {
        MessagesReducer.addMessage(messageContent, MessagesReducer.echoMessage.bind(null, messageContent))
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} />
                <MessageInput addMessage={this.addMessageHandler} />
            </section>
        )
    }
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board
