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
        const buttonDisabled = !this.state.inputValue.length

        return (
            <div style={styles.MessageInput}>
                <input type="text" value={this.state.inputValue} onChange={this.inputChangeHandle} style={styles.input} placeholder='Type a message' />
                <button style={!buttonDisabled ? styles.button : styles.buttonDisabled} disabled={buttonDisabled}>Send</button>
            </div>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    MessageInput: {
        backgroundColor: '#C2C2C4',
        padding: '1em',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        borderRadius: '7px 0 0 7px',
        padding: '1em',
        flex: '1',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '0',
        outline: 'none'
    },
    button: {
        borderRadius: '0 7px 7px 0',
        padding: '1em 1.5em',
        cursor: 'pointer',
        border: '0',
        borderLeft: 'none',
        background: '#86BB71',
        color: 'white'
    },
}
styles.buttonDisabled = {
    ...styles.button,
    cursor: 'auto',
    background: '#DDDDDD',
    color: '#444753'
}

export default MessageInput
