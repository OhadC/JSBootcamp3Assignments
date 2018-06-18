import * as React from 'react'
import { connect } from 'react-redux';

import { ChatTree, IItemHTMLElement } from './chat-tree'
import './Tree.css'
import TreeSearch from './components/treeSearch';
import { ITreeItem } from '../../models'
import * as actions from '../../store/actions'

interface ITreeProps {
    style: object
    filteredTree: ITreeItem[]
    changeActiveGroupId: any
    changeTreeFilter: any
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

    componentDidUpdate() {
        const filterdData = this.props.filteredTree
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

    activeElementChangedHandler = (activeElement: IItemHTMLElement) => this.props.changeActiveGroupId(activeElement.item.groupId)


    filterDataHandler = (filterdText: string) => this.props.changeTreeFilter(filterdText)

    render() {
        return (
            <section style={{ ...this.props.style, ...TreeStyle }} ref={this.sectionRef}>
                <TreeSearch style={{ margin: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white' }} filterData={this.filterDataHandler} />
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

const mapStateToProps = (state: any) => {
    return {
        filteredTree: state.tree.filteredTree
    }
}

const mapDispatchToProps = {
    changeActiveGroupId: actions.setActiveGroupId,
    changeTreeFilter: actions.setTreeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
