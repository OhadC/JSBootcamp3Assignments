import * as React from 'react'
import { connect } from 'react-redux';

import * as actions from '../../store/actions'
import { IState } from '../../store/reducers'
import { IMessage } from '../../models'
import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'

interface IBoardProps {
    style: React.CSSProperties,
    selfUserId: string,
    messages: IMessage[],
    addMessage: any
}

class Board extends React.Component<IBoardProps, any> {
    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={this.props.messages} selfUserId={this.props.selfUserId} />
                <MessageInput addMessage={this.props.addMessage} />
            </section>
        )
    }
}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

const mapStateToProps = (state: IState) => {
    return {
        messages: state.messages.messages,
        selfUserId: state.auth.userId
    }
}

const mapDispatchToProps = {
    addMessage: actions.sendMessage
}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
