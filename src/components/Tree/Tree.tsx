import * as React from 'react'

import { ChatTree, ITreeItem } from './chat-tree'
import './Tree.css'

interface ITreeProps {
    style: object,
    activeChanged: Function
}

class Tree extends React.Component<ITreeProps, {}> {
    private treeDivRef: React.RefObject<any>

    constructor(props: ITreeProps) {
        super(props)

        this.treeDivRef = React.createRef()
    }

    componentDidMount() {
        const chatTree = ChatTree(this.treeDivRef.current)
        chatTree.on('activeElementChanged', this.activeElementChangedHandle)
        this.fetchTreeItems()
            .then((data: ITreeItem[]) => {
                chatTree.load(data)
                this.treeDivRef.current.focus()
            })
    }

    fetchTreeItems() {
        return fetch('./tree.json')
            .then(res => res.json())
    }

    activeElementChangedHandle = (activeElement: any) => {
        this.props.activeChanged(activeElement)
    }

    render() {
        return (
            <ul style={{ ...this.props.style, ...TreeStyle }} className="Tree" ref={this.treeDivRef} tabIndex={0} />
        )
    }
}

const TreeStyle: object = {
    background: '#444753',
    color: 'white'
}

export default Tree
