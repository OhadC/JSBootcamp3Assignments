import * as React from 'react'
import { connect } from 'react-redux';

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import { ITreeItem } from '../../models'
import { IItemHTMLElement } from './components/chat-tree-module'
import TreeSearch from './components/treeSearch'
import ChatTree from './components/ChatTree'
import './Tree.css'

interface IProps {
    filteredTree: ITreeItem[]
    activeGroupId: string | null
    expandedGroupIds: string[]
    changeActiveGroup: any
    changeExpandedGroupIds: any
    changeTreeFilter: any
}

class Tree extends React.Component<IProps, {}> {
    activeElementChangedHandler = (activeElement: IItemHTMLElement) => this.props.changeActiveGroup(activeElement.item.group)
    expandedGroupIdsChangedHandler = (groupId: string, expandedGroupIds: string[]) => this.props.changeExpandedGroupIds(expandedGroupIds)

    render() {
        const chatTreeProps = {
            activeElementChanged: this.activeElementChangedHandler,
            activeId: this.props.activeGroupId,
            expandedIds: this.props.expandedGroupIds,
            expandedIdsChanged: this.expandedGroupIdsChangedHandler,
            filteredTree: this.props.filteredTree
        }

        return (
            <section style={TreeStyle}>
                <TreeSearch filterData={this.props.changeTreeFilter} />
                <ChatTree {...chatTreeProps} />
            </section>
        )
    }
}

const TreeStyle: React.CSSProperties = {
    background: '#252839',
    color: 'white',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
}

const mapStateToProps = (state: IAppState) => ({
    filteredTree: state.tree.filteredTree,
    activeGroupId: state.tree.activeGroup && state.tree.activeGroup.id,
    expandedGroupIds: state.tree.expandedGroupIds
})

const mapDispatchToProps = {
    changeActiveGroup: actions.setActiveGroup,
    changeExpandedGroupIds: actions.setExpandedGroupIds,
    changeTreeFilter: actions.setTreeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
