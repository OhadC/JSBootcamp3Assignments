import * as React from 'react'

import Message from './Message'

class ChatHistory extends React.Component<{ style: React.CSSProperties, messages: Object, selfUserId: string }, {}> {
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
        const messagesElements = Object.keys(this.props.messages).map(key => this.props.messages[key]).map(
            (message: any) => (
                <Message key={message.id} message={message} selfUserId={this.props.selfUserId} />
            )
        )

        return (
            <ul style={{ ...this.props.style, ...styles.chatHistory }} ref={this.messagesList}>
                <li style={{ flex: '1' }} />
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
        display: 'flex',
        flexDirection: 'column'
        // background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/gaming-pattern.png")',
    }
}

export default ChatHistory
