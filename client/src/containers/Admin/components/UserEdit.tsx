import * as React from 'react'
import { connect } from 'react-redux'

import { IAppState } from '../../../store/reducers'
import * as actions from '../../../store/actions'
import Checkbox from '../../../components/Checkbox';

class UserEdit extends React.Component<any, any> {
    state = {
        isNew: false,
        name: "",
        age: 0,
        password: "",
    }

    componentDidMount() {
        this.getStateFromProps()
    }
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!this.state.isNew && (prevState.isNew || prevProps.editedItem !== this.props.editedItem)) {
            this.getStateFromProps()
        } else if (!prevState.isNew && this.state.isNew) {
            this.setState({ name: "", age: 0, password: "" })
        }
    }
    getStateFromProps() {
        const { name, age } = this.props.editedItem
        this.setState({ isNew: false, name: name || "", age: age || 0, password: "" })
    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    valueCheckedHandler = (value: string, isChecked: boolean) => {
        this.setState({ [value]: isChecked })
    }

    onSave = () => {
        if (this.state.isNew) {
            const { name, age, password } = this.state
            this.props.createNewUser({
                name,
                age,
                password
            })
        } else {
            const { age } = this.state
            const id = this.props.editedItem.id
            this.props.updateUser({
                id,
                age
            })
        }
    }
    onDelete = () => this.props.deleteUser(this.props.editedItem)

    render() {
        return (
            <>
                <div style={styles.inputWrapper}>
                    <h2>
                        Currently editing User {this.props.editedItem && this.props.editedItem.name}:
                    </h2>
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label} htmlFor="name">
                        Name:
                    </label>
                    <input type="text" value={this.state.name} name="name" onChange={this.inputChangedHandler} style={styles.input} disabled={!this.state.isNew} />
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label} htmlFor="age">
                        age:
                    </label>
                    <input type="number" value={+this.state.age} name="age" onChange={this.inputChangedHandler} style={styles.input} />
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label} htmlFor="password">
                        password:
                    </label>
                    <input type="password" value={this.state.password} name="password" onChange={this.inputChangedHandler} style={styles.input} disabled={!this.state.isNew} />
                </div>
                <div style={styles.inputWrapper}>
                    <Checkbox isChecked={this.state.isNew} label={"Make new User"} value={"isNew"} onChange={this.valueCheckedHandler} />
                </div>
                <button onClick={this.onSave}>Save</button>
                <button onClick={this.onDelete}>Delete</button>
            </>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    inputWrapper: {
        margin: "0 0 0.5em 0",
    },
    label: {
        display: "block",
        marginBottom: ".5rem"
    },
    input: {
        display: "block",
        width: "100%",
        outline: '1px solid #797b81'
    },
}

const mapStateToProps = (state: IAppState) => ({
    editedItem: state.admin.editedItem,
    users: state.users.data
})

const mapDispatchToProps = {
    createNewUser: actions.createNewUser,
    updateUser: actions.updateUser,
    deleteUser: actions.deleteUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)