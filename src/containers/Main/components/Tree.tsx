import * as React from 'react'

import { ChatTree } from './chat-tree'
import './Tree.css'
import { TreeReducer } from '../../../state/TreeStore';
import { appState } from '../../../state/StateStore';

interface ITreeProps {
    style: object
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
        this.fetchTree()
    }

    componentDidUpdate() {
        if(!appState.tree){     // this cousing more than one fetch - async function takes time to resolve
            this.fetchTree()
        }
    }

    fetchTree = () => {
        const sectionElement = this.sectionRef.current
        const treeDivElement = this.treeDivRef.current
        TreeReducer.fetchTree(() => {
            const chatTree = ChatTree(treeDivElement)
            chatTree.on('activeElementChanged', this.activeElementChangedHandler)
            sectionElement.removeChild(treeDivElement)
            chatTree.load(appState.tree)
            sectionElement.appendChild(treeDivElement)
            // treeDivElement.focus()
        })
    }

    activeElementChangedHandler = (activeElement: any) => {
        console.log(activeElement)
        // this.props.activeChanged(activeElement)
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...TreeStyle }} ref={this.sectionRef}>
                <ul className="Tree" ref={this.treeDivRef} style={{ height: '100%' }} tabIndex={0} />
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
