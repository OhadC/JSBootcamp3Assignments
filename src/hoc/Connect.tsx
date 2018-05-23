import * as React from 'react'

class Connect extends React.Component<{ select: string }, any> {
    render() {
        
        return (
            this.props.children
        )
    }
}

export default Connect
