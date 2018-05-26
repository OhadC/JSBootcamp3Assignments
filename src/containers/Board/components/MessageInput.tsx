import * as React from 'react'

// import Button from '../../../components/Button';

interface IMessageInputProps {
    addMessage: (messageContent: string) => void
}

interface IMessageInputState {
    inputValue: string
}

class MessageInput extends React.Component<IMessageInputProps, IMessageInputState>{
    state = {
        inputValue: ''
    }

    inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value })
    }

    addMessageHandle = () => {
        this.props.addMessage(this.state.inputValue)
        this.setState({ inputValue: '' })
    }

    render() {
        const buttonDisabled = !this.state.inputValue.length

        return (
            <div style={styles.MessageInput}>
                <input type="text" value={this.state.inputValue} onChange={this.inputChangeHandle} style={styles.input} placeholder='Type a message' />
                {/* <Button enabledStyle={styles.button} disabledStyle={styles.buttonDisabled} isDisabled={buttonDisabled} onClick={onClick} text={"send"} /> */}
                <button style={!buttonDisabled ? styles.button : styles.buttonDisabled} disabled={buttonDisabled} onClick={this.addMessageHandle}>
                    Send
                </button>
            </div>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    MessageInput: {
        backgroundColor: '#C2C2C4',
        padding: '0.75em',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        borderRadius: '7px 0 0 7px',
        padding: '0.75em',
        flex: '1',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '0',
        outline: 'none'
    },
    button: {
        borderRadius: '0 7px 7px 0',
        padding: '0.75em 1em',
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
