import * as React from 'react'

class TreeSearch extends React.Component<{ style: React.CSSProperties, filterData: Function }, any> {
    state = {
        filter: ''
    }

    componentDidMount() {
        this.setState({ filter: '' })
    }

    filterChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter: event.target.value })
    }

    onSearch = (event: any) => {
        event.stopPropagation()
        if (!('key' in event) || event['key'] == 'Enter') {
            this.props.filterData(this.state.filter)
        }
    }

    render() {
        return (
            <div style={styles.treeSearch}>
                <input type="text" style={styles.input} placeholder='Search' value={this.state.filter} onChange={this.filterChangedHandler} onKeyPress={this.onSearch} />
                <button style={styles.button} onClick={this.onSearch}>
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
