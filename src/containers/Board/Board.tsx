import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import { MessagesReducer } from '../../state/MessagesStore';
import { appState } from '../../state/StateStore';

class Board extends React.Component<any, {}> {
    componentWillMount() {
        MessagesReducer.changeLocation()
    }

    componentDidUpdate() {
        if (!Object.keys(appState.messages).length) {
            MessagesReducer.changeLocation()
        }
    }

    addMessageHandler = (messageContent: string) => {
        MessagesReducer.addMessage(messageContent, MessagesReducer.echoMessage.bind(null, messageContent))
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={appState.messages || []} userId='1' />
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
