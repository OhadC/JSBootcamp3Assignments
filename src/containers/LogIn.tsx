import * as React from "react"

import Modal from "../components/Modal"

class Login extends React.Component<any, any> {
    state = {
        username: '',
        password: ''
    }

    inputChangedHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    submit = () => this.props.submit(this.state.username, this.state.password)

    render() {
        const canSubmit = !!this.state.username && !!this.state.password

        return (
            <Modal style={styles.modal}>
                <p style={styles.p}>
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input style={styles.input} type="text" name="username" value={this.state.username} onChange={this.inputChangedHandle} />
                </p>
                <p>
                    <label style={styles.label} htmlFor="password">Password</label>
                    <input style={styles.input} type="password" name="password" value={this.state.password} onChange={this.inputChangedHandle} />
                </p>
                <button style={canSubmit ? styles.button : styles.buttonDisabled} disabled={!canSubmit} onClick={this.submit}>Submit</button>
            </Modal>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        minWidth: '25em'
    },
    p: {
        "margin": "0 0 0.5em 0",
    },
    label: {
        "display": "inline-block",
        "marginBottom": ".5rem"
    },
    input: {
        "display": "block",
        "width": "100%",
        "padding": ".375rem .75rem",
        "fontSize": "1rem",
        "lineHeight": "1.5",
        "color": "#495057",
        "backgroundColor": "#fff",
        "backgroundClip": "padding-box",
        "border": "1px solid #ced4da",
        "borderRadius": ".25rem"
    },
    button: {
        borderRadius: '7px',
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

export default Login
