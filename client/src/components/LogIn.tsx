import * as React from "react"

import Modal from "../components/Modal"

class LogIn extends React.Component<{ submit: Function }, any> {
    state = {
        username: 'user1',
        password: 'user1'
    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    submit = () => {
        this.props.submit(this.state.username, this.state.password)
    }

    render() {
        const canSubmit = !!this.state.username && !!this.state.password

        return (
            <Modal style={styles.modal}>
                <p style={styles.p}>
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input style={styles.input} type="text" name="username" value={this.state.username} onChange={this.inputChangedHandler} />
                </p>
                <p>
                    <label style={styles.label} htmlFor="password">Password</label>
                    <input style={styles.input} type="password" name="password" value={this.state.password} onChange={this.inputChangedHandler} />
                </p>
                <button disabled={!canSubmit} onClick={this.submit} style={{ width: "100%", textAlign: 'center', marginTop: "0.5em" }}>Submit</button>
            </Modal>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        minWidth: '23em'
    },
    p: {
        margin: "0 0 0.5em 0",
    },
    label: {
        display: "inline-block",
        marginBottom: ".5rem"
    },
    input: {
        display: "block",
        width: "100%",
        outline: 'none'
    },
}

export default LogIn
