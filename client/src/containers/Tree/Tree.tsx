import * as React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import { IClientGroup, IClientGroupObject } from '../../models'
import TreeSearch from './components/treeSearch'
import './Tree.css'
import TreeItem from './components/TreeItem';

interface IProps {
    style: object
    allGroups: IClientGroupObject
    shownGroups: IClientGroup[]
    activeGroupId: string
    changeActiveGroup: any
    changeTreeFilter: any
    keyEventOnTree: any
}

class Tree extends React.Component<IProps, {}> {

    groupToTree = (group: IClientGroup, level: number) => {
        const ans = [<TreeItem key={group.id} group={group} level={level} isActive={this.props.activeGroupId === group.id} onClick={this.props.changeActiveGroup} />]
        if (group.isExpanded && group.groupIds) {
            group.groupIds.forEach((groupId: string) => ans.push(...this.groupToTree(this.props.allGroups[groupId], level + 1)))
        }
        return ans
    }

    onKeyDown = (e: React.KeyboardEvent<any>) => {
        const handledKeysEvents: any = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter']
        if (handledKeysEvents.includes(e.key)) {
            this.props.keyEventOnTree(e.key)
        }
    }

    render() {
        const treeItems = this.props.shownGroups.map((group: IClientGroup) =>
            <TreeItem key={group.id} group={group} isActive={this.props.activeGroupId === group.id} onClick={this.props.changeActiveGroup} />)

        return (
            <section style={{ ...this.props.style, ...styles.tree }}>
                <TreeSearch style={styles.treeSearch} filterData={this.props.changeTreeFilter} />
                <ul className="Tree" style={styles.ul} tabIndex={0} onKeyDown={this.onKeyDown} >
                    {treeItems}
                </ul>
            </section>
        )
    }
}

const styles: { [key: string]: React.CSSProperties } = {
    tree: {
        background: '#252839',
        color: 'white',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    treeSearch: {
        margin: '1rem',
        background: 'rgba(255,255,255,0.1)',
        color: 'white'
    },
    ul: {
        flex: '1',

    }
}

const mapStateToProps = (state: IAppState) => ({
    allGroups: state.tree.allGroups,
    shownGroups: state.tree.shownGroups,
    activeGroupId: state.tree.activeGroupId
})

const mapDispatchToProps = {
    changeActiveGroup: actions.setActiveGroupId,
    changeTreeFilter: actions.setGroupsFilter,
    keyEventOnTree: actions.keyEventOnTree
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
