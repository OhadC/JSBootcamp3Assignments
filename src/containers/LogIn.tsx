import * as React from "react"

import Modal from "../components/Modal"
import * as AuthReducer from "../state/AuthReducer";

class Login extends React.Component<any, any> {
    state = {
        username: '',
        password: ''
    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    submit = () => AuthReducer.login(this.state.username, this.state.password)

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
                <button disabled={!canSubmit} onClick={this.submit}>Submit</button>
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

export default Login
