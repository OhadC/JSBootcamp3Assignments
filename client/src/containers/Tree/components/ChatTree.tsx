import * as React from 'react'

import ChatTreeModule from './chat-tree-module'
import { ITreeItem } from '../../../models'

interface IProps {
    filteredTree: ITreeItem[]
    activeGroupId: string | null
    expandedGroupIds: string[]
    activeElementChanged: any
    expandedGroupIdsChanged: any
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
        this.chatTree.on('groupExpanded', this.props.expandedGroupIdsChanged)
        this.chatTree.on('groupFolded', this.props.expandedGroupIdsChanged)

        this.loadTree(this.props.filteredTree, this.props.expandedGroupIds, this.props.activeGroupId)
    }
    componentDidUpdate(prevProps: IProps, prevState: {}, snapshot: any) {
        if (prevProps.filteredTree !== this.props.filteredTree) {
            this.loadTree(this.props.filteredTree, this.props.expandedGroupIds, this.props.activeGroupId)
        }
    }
    componentWillUnmount() {
        this.chatTree.off('activeElementChanged', this.props.activeElementChanged)
        this.chatTree.off('groupExpanded', this.props.expandedGroupIdsChanged)
        this.chatTree.off('groupFolded', this.props.expandedGroupIdsChanged)
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
