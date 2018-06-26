import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { IAppState } from '../../store/reducers'
import Tree from './Tree'

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

const GroupsTree = connect(mapStateToProps, mapDispatchToProps)(Tree)

export default GroupsTree
