import * as React from 'react'

class TreeItem extends React.Component<any, any> {
    state = {
        isExpanded: false
    }

    render() {
        return (
            <li style={{ paddingLeft: `${(this.props.level + 1) * 1}em` }}>
                {this.props.group.name}
            </li>
        )
    }
}

export default TreeItem
