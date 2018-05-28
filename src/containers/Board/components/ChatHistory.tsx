import * as React from 'react'

import Message from './Message'

class ChatHistory extends React.Component<any, any> {
    private messagesEnd: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.messagesEnd = React.createRef()
    }

    componentDidUpdate() {
        this.scrollToBottom()   // TODO: validation if needed
    }

    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView()
    }

    render() {
        const messagesElements = Object.keys(this.props.messages).map(key => this.props.messages[key]).map(
            (message: any) => (
                <Message key={message.id} content={message.content} selfMessage={this.props.userId === message.userId} />
            )
        )

        return (
            <ul style={{ ...this.props.style, ...styles.chatHistory }}>
                {messagesElements}
                <li style={{ float: "left", clear: "both" }} ref={this.messagesEnd} />
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
