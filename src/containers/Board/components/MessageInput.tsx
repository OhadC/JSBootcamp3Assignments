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

    inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value })
    }
    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation()
        if (event.key == 'Enter' && !event.shiftKey) {
            this.addMessageHandler()
        }
    }

    addMessageHandler = () => {
        this.props.addMessage(this.state.inputValue)
        this.setState({ inputValue: '' })
    }

    render() {
        const buttonDisabled = !this.state.inputValue.length

        return (
            <div style={styles.MessageInput}>
                <input type="text" value={this.state.inputValue} onChange={this.inputChangeHandler} onKeyPress={this.handleKeyPress} style={styles.input} placeholder='Type a message' />
                <button style={styles.button} disabled={buttonDisabled} onClick={this.addMessageHandler}>
                    Send
                </button>
            </div>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    MessageInput: {
        backgroundColor: '#E2E5EE',
        padding: '0.75em',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        flex: '1',
        border: '0',
    },
    button: {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
    }
}

export default MessageInput
