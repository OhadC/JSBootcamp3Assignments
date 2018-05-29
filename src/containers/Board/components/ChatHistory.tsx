import * as React from 'react'

import Message from './Message'

class ChatHistory extends React.Component<any, any> {
    private messagesList: React.RefObject<any>
    private messagesBottom: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.messagesList = React.createRef()
        this.messagesBottom = React.createRef()
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!snapshot || !snapshot.scrollButtomOfset || snapshot.scrollButtomOfset < 50)
            this.scrollToBottom()
    }
    getSnapshotBeforeUpdate() {
        const messagesListElement = this.messagesList.current
        const scrollButtomOfset: number =
            messagesListElement.scrollHeight - messagesListElement.offsetHeight - messagesListElement.scrollTop
        return { scrollButtomOfset }
    }

    scrollToBottom = () => {
        this.messagesBottom.current.scrollIntoView()
    }

    render() {
        const messagesElements = Object.keys(this.props.messages).map(key => this.props.messages[key]).map(
            (message: any) => (
                <Message key={message.id} content={message.content} selfMessage={this.props.userId === message.userId} />
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
