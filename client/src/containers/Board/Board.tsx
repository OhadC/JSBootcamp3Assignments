import * as React from 'react'
import { connect } from 'react-redux';

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import { IMessage } from '../../models';

interface IBoardProps {
    style: React.CSSProperties,
    selfUserId: string,
    messages: IMessage[]
}

class Board extends React.Component<IBoardProps, any> {
    addMessageHandler = (messageContent: string) => {
        // MessagesReducer.addMessage(messageContent, MessagesReducer.echoMessage.bind(null, messageContent))
    }

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

}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
