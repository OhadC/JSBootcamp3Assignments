import * as React from "react"

import Modal from "../components/Modal"

class LogIn extends React.Component {
    render() {
        const buttonDisabled = false

        return (
            <Modal>
                <p style={styles.p}>
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input style={styles.input} type="text" name="username" />
                </p>
                <p>
                    <label style={styles.label} htmlFor="password">Password</label>
                    <input style={styles.input} type="password" name="password" />
                </p>
                <button style={!buttonDisabled ? styles.button : styles.buttonDisabled} disabled={buttonDisabled}>Submit</button>
            </Modal>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
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
    }

}

export default LogIn
