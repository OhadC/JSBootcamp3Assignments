import * as React from 'react'

class GroupEdit extends React.Component<any, any> {
    state = {
        isNew: false,
        name: "",
        userIds: []
    }

    componentDidMount() {
        this.getStateFromProps()
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!this.state.isNew && (prevState.isNew || prevProps !== this.props)) {
            this.getStateFromProps()
        }
    }

    getStateFromProps() {
        const { name, userIds, parentId } = this.props.editedItem
        this.setState({ isNew: false, name, userIds, parentId })
    }

    onSave = () => this.props.updateGroup(this.props.editedItem)
    onDelete = () => this.props.deleteGroup(this.props.editedItem)

    render() {
        return (
            <>
                <h2>
                    Currently editing {this.props.editedItem && this.props.editedItem.name}:
                </h2>
                <label>
                    Name:
                </label>
                <input type="text" value={this.props.editedItem.name} />
                <label>
                    Users:
                </label>

                <hr />
                <button onClick={this.onSave}>Save</button>
                <button onClick={this.onDelete}>Delete</button>
            </>
        )
    }
}

export default GroupEdit