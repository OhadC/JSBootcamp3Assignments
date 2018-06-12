import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import * as MessagesReducer from '../../state/MessagesReducer'
import { StateStore, IAppState } from '../../state/StateStore'

class Board extends React.Component<{ style: React.CSSProperties, selfUserId: string }, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            messages: StateStore.appState.messages
        }
        StateStore.subscribe(this.selectState)
    }

    selectState = (appState: IAppState) => this.setState({ messages: appState.messages })

    addMessageHandler = (messageContent: string) => {
        MessagesReducer.addMessage(messageContent, MessagesReducer.echoMessage.bind(null, messageContent))
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={this.state.messages} selfUserId={this.props.selfUserId} />
                <MessageInput addMessage={this.addMessageHandler} />
            </section>
        )
    }
}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board
