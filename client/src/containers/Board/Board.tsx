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
    selectPrivateGroup: any
}

const Board: React.SFC<IProps> = props => {
    const privateChatSelectedHandler = (userId: string) => {
        props.selectPrivateGroup(props.group._id, userId)
    }

    const { messages, selfUserId } = props
    return (
        <section style={{ ...props.style, ...boardStyle }}>
            {props.group && <GroupInfo group={props.group} selfUserId={props.selfUserId} onUserClicked={privateChatSelectedHandler} />}
            <ChatHistory style={{ flex: '1' }} messages={messages} selfUserId={selfUserId} />
            <MessageInput addMessage={props.addMessage} />
        </section>
    )
}

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

const mapStateToProps = (state: IAppState) => ({
    messages: state.messages.messages,
    selfUserId: state.auth.userId,
    group: state.tree.active
})

const mapDispatchToProps = {
    addMessage: actions.sendMessage,
    selectPrivateGroup: actions.selectPrivateGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
