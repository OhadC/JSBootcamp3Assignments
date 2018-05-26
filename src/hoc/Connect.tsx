import * as React from 'react'

import { StateStore, IStateStore } from '../state/StateStore'

interface IConnectProps { 
    select: string, 
    children: (data: any) => React.ReactNode
}

class Connect extends React.Component<IConnectProps, {data: any}> {
    store: IStateStore

    constructor(props: IConnectProps) {
        super(props)
        this.store = StateStore.getInstance()
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this.store.on(this.props.select, this.updateState)
        this.updateState(this.store.get(this.props.select))

    }
    componentWillUnmount() {
        this.store.off(this.props.select, this.updateState)
    }

    updateState = (updatedState: any) => {
        this.setState({data: updatedState})
    }

    render() {
        return (
            this.props.children(this.state.data)
        )
    }
}

export default Connect
