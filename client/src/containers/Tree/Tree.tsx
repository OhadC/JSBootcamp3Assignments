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
    changeActiveGroup: any
    changeTreeFilter: any
}

class Tree extends React.Component<IProps, {}> {
    groupToTree = (group: IClientGroup, level: number) => {
        const ans = [<TreeItem key={group.id} group={group} level={level} groups={this.props.allGroups} />]
        if (group.isExpanded && group.groupIds) {
            group.groupIds.forEach((groupId: string) => ans.push(...this.groupToTree(this.props.allGroups[groupId], level + 1)))
        }
        return ans
    }

    render() {
        const treeItems = this.props.shownGroups.map((group: IClientGroup) => this.groupToTree(group, 0))

        return (
            <section style={{ ...this.props.style, ...styles.tree }}>
                <TreeSearch style={styles.treeSearch} filterData={this.props.changeTreeFilter} />
                <ul className="Tree" style={{ flex: '1' }} tabIndex={0} >
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
    }
}

const mapStateToProps = (state: IAppState) => ({
    allGroups: state.tree.allGroups,
    shownGroups: state.tree.shownGroups
})

const mapDispatchToProps = {
    changeActiveGroup: actions.setActiveGroup,
    changeTreeFilter: actions.setGroupsFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
