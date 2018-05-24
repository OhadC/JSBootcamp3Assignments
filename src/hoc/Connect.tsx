import * as React from 'react'

import { StateStore, IStateStore } from '../state/StateStore'

interface IConnectProps { 
    select: string, 
    children: (data: any) => {} 
}

class Connect extends React.Component<IConnectProps, object> {
    store: IStateStore

    constructor(props: IConnectProps) {
        super(props)
        this.store = StateStore.getInstance()
        this.state = {}
    }

    componentDidMount() {
        this.store.on(this.props.select, this.updateState)
        this.updateState(this.store.get(this.props.select))

    }
    componentWillUnmount() {
        this.store.off(this.props.select, this.updateState)
    }

    updateState = (updatedState: object) => {
        this.setState(updatedState)
    }


    render() {
        return (
            this.props.children({})
        )
    }
}

export default Connect
