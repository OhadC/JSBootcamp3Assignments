import * as React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import { IClientGroup, IClientMessage } from '../../models'
import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'
import GroupInfo from './components/GroupInfo'

interface IProps {
    style: React.CSSProperties
    group: IClientGroup
    selfUserId: string
    messages: IClientMessage[]
    addMessage: any
}

class Board extends React.Component<IProps, {}> {
    render() {
        const { messages, selfUserId } = this.props
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                {this.props.group ? <GroupInfo group={this.props.group} /> : null}
                <ChatHistory style={{ flex: '1' }} messages={messages} selfUserId={selfUserId} />
                <MessageInput addMessage={this.props.addMessage} />
            </section>
        )
    }
}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

const mapStateToProps = (state: IAppState) => {
    return {
        messages: state.messages.messages,
        selfUserId: state.auth.userId,
        group: state.global.activeGroup
    }
}

const mapDispatchToProps = {
    addMessage: actions.sendMessage
}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
