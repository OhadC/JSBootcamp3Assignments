import * as React from 'react'

import { ChatTree, IItemHTMLElement, ITreeItem } from './chat-tree'
import './Tree.css'
import { appState } from '../../state/StateStore';
import * as TreeReducer from '../../state/TreeReducer';
import TreeSearch from './components/treeSearch';

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
        const filterdData = appState.tree.filterdData
        if (filterdData !== this.loadedTree) {
            const sectionElement = this.sectionRef.current
            const treeDivElement = this.treeDivRef.current

            const chatTree = ChatTree(treeDivElement)
            chatTree.on('activeElementChanged', this.activeElementChangedHandler)
            sectionElement.removeChild(treeDivElement)
            chatTree.load(filterdData)
            sectionElement.appendChild(treeDivElement)

            this.loadedTree = filterdData
        }
    }

    activeElementChangedHandler = (activeElement: IItemHTMLElement) => {
        TreeReducer.setActiveItem(activeElement.item)
    }

    render() {
        return (
            <section style={{ ...this.props.style, ...TreeStyle }} ref={this.sectionRef}>
                <TreeSearch style={{margin: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white'}}/>
                <ul className="Tree" ref={this.treeDivRef} style={{ flex: '1' }} tabIndex={0} />
            </section>
        )
    }
}

const TreeStyle: React.CSSProperties = {
    background: '#252839',
    color: 'white',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
}

export default Tree
