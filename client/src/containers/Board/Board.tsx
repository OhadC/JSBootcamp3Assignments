import * as React from 'react'
import { connect } from 'react-redux';

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import { IMessage } from '../../models';
import * as actions from '../../store/actions'

interface IBoardProps {
    style: React.CSSProperties,
    selfUserId: string,
    messages: IMessage[],
    addMessage: any
}

class Board extends React.Component<IBoardProps, any> {
    addMessageHandler = (messageContent: string) => this.props.addMessage(messageContent)

    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={this.props.messages} selfUserId={this.props.selfUserId} />
                <MessageInput addMessage={this.addMessageHandler} />
            </section>
        )
    }
}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

const mapStateToProps = (state: any) => {
    return {
        messages: state.messages.messages,
        selfUserId: state.auth.userId
    }
}

const mapDispatchToProps = {
    addMessage: actions.sendMessage
}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
