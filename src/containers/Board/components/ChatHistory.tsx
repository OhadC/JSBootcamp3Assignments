import * as React from 'react'

import Message from './Message'

class ChatHistory extends React.Component<any, any> {
    state = {
        messages: []
    }

    componentWillMount() {
        this.fetchMessages()
            .then((messages: any[]) => {
                this.setState({ messages })
            })
    }

    fetchMessages() {
        return new Promise((res, rej) => {
            const mockMessages = [
                {
                    id: "1",
                    user: "one",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus asperiores eligendi, nesciunt consequatur inventore ducimus neque iusto adipisci deleniti debitis cumque enim atque veniam modi illo facilis consequuntur quas. Velit!"
                }, {
                    id: "2",
                    user: "two",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus asperiores eligendi, nesciunt consequatur inventore ducimus neque iusto adipisci deleniti debitis cumque enim atque veniam modi illo facilis consequuntur quas. Velit!"
                }, {
                    id: "3",
                    name: "one",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus asperiores eligendi, nesciunt consequatur inventore ducimus neque iusto adipisci deleniti debitis cumque enim atque veniam modi illo facilis consequuntur quas. Velit!"
                }, {
                    id: "4",
                    name: "one",
                    content: "Lorem ipsum"
                },
            ]
            res(mockMessages)
        })
    }

    render() {
        const messagesElements = this.state.messages.map((message: any) =>
            <Message key={message.id} content={message.content} selfMessage={this.props.user === message.user} />
        )

        return (
            <ul style={{ ...this.props.style, ...styles.chatHistory }}>
                {messagesElements}
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
