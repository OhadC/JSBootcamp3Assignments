import * as React from 'react'

import ChatHistory from './components/ChatHistory'
import MessageInput from './components/MessageInput'

interface IBoardState {
    messages: any[]
}

class Board extends React.Component<any, IBoardState> {
    private messagesEnd: React.RefObject<any>

    constructor(props: any) {
        super(props)

        this.messagesEnd = React.createRef()

        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        this.fetchMessages()
            .then((messages: any[]) => {
                this.setState({ messages }, this.scrollToBottom)
            })
    }

    fetchMessages = () => {
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
            res(mockMessages || [])
        })
    }

    addMessageHandle = (messageContent: string) => {
        // post message, and add the response.newMessage to this.state.messages

        this.setState((prevState: IBoardState) => ({
            messages: [
                ...prevState.messages,
                {
                    id: "a",
                    user: "one",
                    content: messageContent
                }
            ]
        }), this.scrollToBottom)
    }

    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView()
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={this.state.messages || []} user='one' messagesEnd={this.messagesEnd} />
                <MessageInput addMessage={this.addMessageHandle} />
            </section>
        )
    }
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board
