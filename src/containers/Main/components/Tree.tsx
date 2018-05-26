import * as React from 'react'

import { ChatTree, ITreeItem } from './chat-tree'
import './Tree.css'

interface ITreeProps {
    style: object,
    activeChanged: Function
}

class Tree extends React.Component<ITreeProps, {}> {
    private treeDivRef: React.RefObject<any>
    private sectionRef: React.RefObject<any>

    constructor(props: ITreeProps) {
        super(props)

        this.sectionRef = React.createRef()
        this.treeDivRef = React.createRef()
    }

    componentDidMount() {
        this.sectionRef.current.removeChild(this.treeDivRef.current)
        const chatTree = ChatTree(this.treeDivRef.current)
        chatTree.on('activeElementChanged', this.activeElementChangedHandle)
        this.fetchTreeItems()
            .then((data: ITreeItem[]) => {
                chatTree.load(data)
                this.sectionRef.current.appendChild(this.treeDivRef.current)
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
            <section style={{ ...this.props.style, ...TreeStyle }}  ref={this.sectionRef}>
                <ul className="Tree" ref={this.treeDivRef} style={{height: '100%'}} tabIndex={0} />
            </section>
        )
    }
}

const TreeStyle: React.CSSProperties = {
    background: '#444753',
    color: 'white',
    overflowY: 'auto'
}

export default Tree
