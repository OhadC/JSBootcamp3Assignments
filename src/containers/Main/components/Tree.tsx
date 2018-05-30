import * as React from 'react'

import { ChatTree, IItemHTMLElement, ITreeItem } from './chat-tree'
import './Tree.css'
import { appState } from '../../../state/StateStore';
import * as TreeReducer from '../../../state/TreeReducer';

interface ITreeProps {
    style: object
}

class Tree extends React.Component<ITreeProps, {}> {
    private treeDivRef: React.RefObject<any>
    private sectionRef: React.RefObject<any>
    private loadedTree: Array<ITreeItem> | null

    constructor(props: ITreeProps) {
        super(props)

        this.sectionRef = React.createRef()
        this.treeDivRef = React.createRef()
        this.loadedTree = null
    }

    componentDidMount() {
        TreeReducer.fetchTree()
    }

    componentDidUpdate() {
        if (appState.tree.treeData !== this.loadedTree) {
            const sectionElement = this.sectionRef.current
            const treeDivElement = this.treeDivRef.current
            
            const chatTree = ChatTree(treeDivElement)
            chatTree.on('activeElementChanged', this.activeElementChangedHandler)
            sectionElement.removeChild(treeDivElement)
            chatTree.load(appState.tree.treeData)
            sectionElement.appendChild(treeDivElement)
            
            this.loadedTree = appState.tree.treeData
        }
    }

    activeElementChangedHandler = (activeElement: IItemHTMLElement) => {
        TreeReducer.setActiveItem(activeElement.item)
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
    background: '#34353F',
    color: 'white',
    overflowY: 'auto'
}

export default Tree
