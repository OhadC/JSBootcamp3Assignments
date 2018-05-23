import * as React from 'react'

import ChatHistory from '../components/ChatHistory'
import MessageInput from './MessageInput'

class Board extends React.Component<any, any> {
    state = {
        messages: null
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
                },
            ]
            res(mockMessages)
        })
    }

    render() {
        return (
            <div style={{ ...this.props.style, ...boardStyle }}>
                <ChatHistory style={{ flex: '1' }} messages={this.state.messages || []} user='one' />
                <MessageInput />
            </div>
        )
    }
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board