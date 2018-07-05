import * as React from 'react'
import { connect } from 'react-redux'

import CheckboxList from '../../../components/CheckboxList'
import { IAppState } from '../../../store/reducers'
import * as actions from '../../../store/actions'
import Checkbox from '../../../components/Checkbox'

class GroupEdit extends React.PureComponent<any, any> {
    state = {
        isNew: false,
        isRoot: false,
        name: "",
        userIds: []
    }

    componentDidMount() {
        this.getStateFromProps()
    }
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!this.state.isNew && (prevState.isNew || prevProps.editedItem !== this.props.editedItem)) {
            this.getStateFromProps()
        } else if (!prevState.isNew && this.state.isNew) {
            this.setState({ isRoot: false, name: "", userIds: [] })
        }
    }
    getStateFromProps() {
        const { name, userIds, parentId } = this.props.editedItem
        this.setState({ isNew: false, name, userIds, parentId })
    }

    nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value })
    }

    usersListChangeHandler = (userIds: string[]) => this.setState({ userIds })

    valueCheckedHandler = (value: string, isChecked: boolean) => {
        this.setState({ [value]: isChecked })
    }

    onSave = () => {
        const { name, userIds } = this.state
        if (this.state.isNew) {
            const parentId = this.state.isRoot ? undefined : this.props.editedItem.id
            this.props.createNewGroup({
                parentId,
                name,
                userIds
            })
        } else {
            const id = this.props.editedItem.id
            this.props.updateGroup({
                id,
                name,
                userIds
            })
        }
    }
    onDelete = () => this.props.deleteGroup(this.props.editedItem)

    render() {
        return (
            <>
                <div style={styles.inputWrapper}>
                    <h2>
                        Currently editing group {this.props.editedItem && this.props.editedItem.name}:
                    </h2>
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label} htmlFor="name">
                        Name:
                    </label>
                    <input type="text" value={this.state.name} name={name} onChange={this.nameChangeHandler} style={styles.input} />
                </div>
                <div style={styles.inputWrapper}>
                    <label style={styles.label}>
                        Users:
                    </label>
                    <CheckboxList data={this.props.users} value={"id"} label={"name"} checkedValues={this.state.userIds} onChange={this.usersListChangeHandler} />
                </div>
                <div style={styles.inputWrapper}>
                    <Checkbox isChecked={this.state.isNew} label={"Make new Group"} value={"isNew"} onChange={this.valueCheckedHandler} />
                    <br />
                    {this.state.isNew && <Checkbox isChecked={this.state.isRoot} label={"Put at root level"} value={"isRoot"} onChange={this.valueCheckedHandler} />}
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
    createNewGroup: actions.createNewGroup,
    updateGroup: actions.updateGroup,
    deleteGroup: actions.deleteGroup,
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupEdit)