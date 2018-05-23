import * as React from 'react'

// interface IMessageInputState {
//     inputText: string
// }

class MessageInput extends React.Component<any, any>{
    state = {
        inputValue: ''
    }

    inputChangeHandle = (e: any) => {
        this.setState({ inputValue: e.target.value })
    }

    render() {
        return (
            <div style={{padding: '1em'}}>
                <input type="text" value={this.state.inputValue} onChange={this.inputChangeHandle} placeholder='Type a message' />
                <button>Send</button>
            </div>
        )
    }
}

export default MessageInput