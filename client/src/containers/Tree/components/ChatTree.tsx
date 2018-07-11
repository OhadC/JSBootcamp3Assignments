import * as React from 'react'

import ChatTreeModule from './chat-tree-module'
import { ITreeItem } from '../../../models'

interface IProps {
    filteredTree: ITreeItem[]
    activeId: string | null
    forcedActiveId: string | null
    expandedIds: string[]
    activeElementChanged: any
    expandedIdsChanged: any
}

class ChatTree extends React.Component<IProps, {}> {
    private treeDivRef: React.RefObject<any>
    private sectionRef: React.RefObject<any>
    private chatTree: any

    constructor(props: any) {
        super(props)

        this.sectionRef = React.createRef()
        this.treeDivRef = React.createRef()
    }

    componentDidMount() {
        const treeDivElement = this.treeDivRef.current
        this.chatTree = ChatTreeModule(treeDivElement)

        this.chatTree.on('activeElementChanged', this.props.activeElementChanged)
        this.chatTree.on('groupExpanded', this.props.expandedIdsChanged)
        this.chatTree.on('groupFolded', this.props.expandedIdsChanged)

        this.loadTree(this.props.filteredTree, this.props.expandedIds, this.props.activeId)
    }
    shouldComponentUpdate(nextProps: IProps) {
        return (
            (this.props.filteredTree !== nextProps.filteredTree) ||
            (!!nextProps.forcedActiveId && (nextProps.forcedActiveId !== this.props.forcedActiveId))
        )
    }
    componentDidUpdate() {
        this.loadTree(this.props.filteredTree, this.props.expandedIds, this.props.forcedActiveId ||this.props.activeId)
    }
    componentWillUnmount() {
        this.chatTree.off('activeElementChanged', this.props.activeElementChanged)
        this.chatTree.off('groupExpanded', this.props.expandedIdsChanged)
        this.chatTree.off('groupFolded', this.props.expandedIdsChanged)

        this.chatTree.clear()
    }

    loadTree = (filteredTree: ITreeItem[], expandedGroupIds: string[], activeGroupId: string | null) => {
        const sectionElement = this.sectionRef.current
        const treeDivElement = this.treeDivRef.current

        sectionElement.removeChild(treeDivElement)
        this.chatTree.load(filteredTree, expandedGroupIds, activeGroupId)
        sectionElement.appendChild(treeDivElement)
    }

    render() {
        return (
            <div ref={this.sectionRef} style={{ flex: '1', display: 'flex' }}>
                <ul className="Tree" ref={this.treeDivRef} style={{ flex: '1' }} tabIndex={0} />
            </div>
        )
    }
}

export default ChatTree
