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
            <div style={MessageInputStyle}>
                <input type="text" value={this.state.inputValue} onChange={this.inputChangeHandle} style={inputStyle} placeholder='Type a message' />
                <button style={buttonStyle}>Send</button>
            </div>
        )
    }
}

const MessageInputStyle: object = {
    backgroundColor: '#C2C2C4',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row'
}

const inputStyle: object = {
    borderRadius: '7px 0 0 7px',
    padding: '1em',
    flex: '1',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    // border: '1px solid #464853'
    border: '0'
}

const buttonStyle: object = {
    borderRadius: '0 7px 7px 0',
    padding: '1em 1.5em',
    cursor: 'pointer',
    // border: '1px solid #464853',
    border: '0',
    borderLeft: 'none'
}

export default MessageInput