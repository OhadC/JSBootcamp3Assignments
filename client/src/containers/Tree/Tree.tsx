import * as React from "react"
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import { ITreeItem } from '../../models'
import { IItemHTMLElement } from './components/chat-tree-module'
import TreeSearch from './components/treeSearch'
import ChatTree from './components/ChatTree'
import './Tree.css'

interface IProps {
    filteredTree: ITreeItem[]
    activeId: string | null
    expandedIds: string[]
    changeActive: any
    changeExpandedIds: any
    changeTreeFilter: any
}

export class Tree extends React.Component<IProps, {}> {
    activeElementChangedHandler = (activeElement: IItemHTMLElement) => this.props.changeActive(activeElement.item.group)
    expandedIdsChangedHandler = (id: string, expandedIds: string[]) => this.props.changeExpandedIds(expandedIds)

    render() {
        const chatTreeProps = {
            activeElementChanged: this.activeElementChangedHandler,
            activeId: this.props.activeId,
            expandedIds: this.props.expandedIds,
            expandedIdsChanged: this.expandedIdsChangedHandler,
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
    activeId: state.tree.active && state.tree.active.id,
    expandedIds: state.tree.expandedIds
})

const mapDispatchToProps = {
    changeActive: actions.setActive,
    changeExpandedIds: actions.setExpandedIds,
    changeTreeFilter: actions.setTreeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
