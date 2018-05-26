import * as React from 'react'

import { StateStore, IStateStore } from '../state/StateStore'

interface ISelectProps { 
    WrappedComponent: any
    select: string, 
}

class Select extends React.Component<ISelectProps, object> {
    store: IStateStore

    constructor(props: ISelectProps) {
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
            <this.props.WrappedComponent />
        )
    }
}

export default Select
