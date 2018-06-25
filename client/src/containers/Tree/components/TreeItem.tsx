import * as React from 'react'

class TreeItem extends React.Component<any, any> {
    state = {
        isExpanded: false
    }

    onClick = () => this.props.onClick(this.props.group)

    render() {
        const classes = []
        if (this.props.isActive) classes.push('active')
        if (!this.props.group.isPrivate) classes.push('group')
        if (this.props.group.isExpanded) classes.push('expanded')

        const level = this.props.group.level || 0

        return (
            <li style={{ paddingLeft: `${(level + 1) * 1}em` }} className={classes.join(' ')} onClick={this.onClick} >
                {this.props.group.name}
            </li>
        )
    }
}

export default TreeItem
