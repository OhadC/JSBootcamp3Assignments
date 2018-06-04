import * as React from 'react'
import { filterData } from '../../../state/TreeReducer'
import { appState } from '../../../state/StateStore'

class TreeSearch extends React.Component<any, any> {
    state = {
        filter: ''
    }

    componentDidMount() {
        this.setState({ filter: appState.tree.filterText })
    }

    filterChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value })
    }

    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation()
        if (event.key == 'Enter') {
            filterData(this.state.filter)
        }
    }

    render() {
        return (
            <div style={styles.treeSearch}>
                <input type="text" style={styles.input} placeholder='Search' value={this.state.filter} onChange={this.filterChangedHandler} onKeyPress={this.handleKeyPress} />
                <button style={styles.button}>
                    search
                </button>
            </div>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    treeSearch: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        flex: '1',
        border: '0',
        background: 'rgba(255,255,255,0.1)',
        color: 'white',
        minWidth: '5em'
    },
    button: {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        background: 'rgba(255,255,255,0.2)',
    }
}

export default TreeSearch
