import * as React from 'react'
import { filterData } from '../../../state/TreeReducer';

class TreeSearch extends React.Component<any, any> {
    state = {
        filter: ''
    }

    filterChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value })
    }

    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation()
        if (event.key == 'Enter') {
            console.log(this.state.filter)
            filterData(this.state.filter)
        }
    }

    render() {
        return (
            <input type="text" style={this.props.style} placeholder='Search' value={this.state.filter} onChange={this.filterChangedHandler} onKeyPress={this.handleKeyPress} />
        )
    }
}

// const styling: React.CSSProperties = {

// }

export default TreeSearch
