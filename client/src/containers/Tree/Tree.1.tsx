import * as React from 'react'
import { connect } from 'react-redux';

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import { ITreeItem } from '../../models'
import { ChatTree, IItemHTMLElement } from './chat-tree'
import TreeSearch from './components/treeSearch'
import './Tree.css'

interface IProps {
    style: object
    filteredTree: ITreeItem[]
    changeActiveGroup: any
    changeTreeFilter: any
}

class Tree extends React.Component<IProps, {}> {
    private treeDivRef: React.RefObject<any>
    private sectionRef: React.RefObject<any>
    private loadedTree: Array<ITreeItem> | null
    private chatTree: any

    constructor(props: IProps) {
        super(props)

        this.sectionRef = React.createRef()
        this.treeDivRef = React.createRef()
        this.loadedTree = null
    }

    componentDidMount() {
        this.loadTree(this.props.filteredTree)
    }
    componentDidUpdate() {
        const { filteredTree } = this.props
        if (filteredTree !== this.loadedTree) {
            this.updateTree(filteredTree)
            this.loadedTree = filteredTree
        }
    }

    loadTree(treeObject: ITreeItem[]) {
        const sectionElement = this.sectionRef.current
        const treeDivElement = this.treeDivRef.current
        this.chatTree = ChatTree(treeDivElement)
        this.chatTree.on('activeElementChanged', this.activeElementChangedHandler)
        sectionElement.removeChild(treeDivElement)
        this.chatTree.load(treeObject)
        sectionElement.appendChild(treeDivElement)
    }

    updateTree(treeObject: ITreeItem[]) {
        const sectionElement = this.sectionRef.current
        const treeDivElement = this.treeDivRef.current
        sectionElement.removeChild(treeDivElement)
        this.chatTree.updateTree(treeObject)
        sectionElement.appendChild(treeDivElement)
    }

    activeElementChangedHandler = (activeElement: IItemHTMLElement) => this.props.changeActiveGroup(activeElement.item.group)

    render() {
        return (
            <section style={{ ...this.props.style, ...TreeStyle }} ref={this.sectionRef}>
                <TreeSearch style={{ margin: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white' }} filterData={this.props.changeTreeFilter} />
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

const mapStateToProps = (state: IAppState) => ({
    filteredTree: state.tree.filteredTree
})

const mapDispatchToProps = {
    changeActiveGroup: actions.setActiveGroup,
    changeTreeFilter: actions.setTreeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
