import * as React from 'react'

import Message from './Message'
import { appState } from '../../../state/StateStore';

class ChatHistory extends React.Component<{ style: React.CSSProperties }, {}> {
    private messagesList: React.RefObject<any>
    private messagesBottom: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.messagesList = React.createRef()
        this.messagesBottom = React.createRef()
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!snapshot || !snapshot.scrollButtomOffset || snapshot.scrollButtomOffset < 16 * 5)
            this.scrollToBottom()
    }
    getSnapshotBeforeUpdate() {
        const messagesListElement = this.messagesList.current
        const scrollButtomOffset: number =
            messagesListElement.scrollHeight - messagesListElement.offsetHeight - messagesListElement.scrollTop
        return { scrollButtomOffset }
    }

    scrollToBottom() {
        this.messagesBottom.current.scrollIntoView()
    }

    render() {
        const messages = appState.messages
        const selfUserId = appState.auth.user.id
        const messagesElements = Object.keys(messages).map(key => messages[key]).map(
            (message: any) => (
                <Message key={message.id} message={message} selfUserId={selfUserId} />
            )
        )

        return (
            <ul style={{ ...this.props.style, ...styles.chatHistory }} ref={this.messagesList}>
                {messagesElements}
                <li style={{ float: "left", clear: "both" }} ref={this.messagesBottom} />
            </ul>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    chatHistory: {
        listStyle: 'none',
        margin: '0',
        padding: '1em',
        overflowY: 'auto',
        // background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/gaming-pattern.png")',
    }
}

export default ChatHistory
