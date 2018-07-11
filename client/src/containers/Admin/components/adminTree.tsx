import { connect } from 'react-redux'

import { Tree } from "../../Tree/Tree"
import { IAppState } from "../../../store/reducers"
import { adminGroupsTreeSelector, adminUsersTreeSelector } from "../../../store/selectors"
import * as actions from "../../../store/actions"

const chooseCombiner = (editMode: 'groups' | 'users') => {
    if (editMode === 'groups') return adminGroupsTreeSelector
    else return adminUsersTreeSelector
}

const mapStateToProps = (state: IAppState) => ({
    tree: chooseCombiner(state.admin.editMode)(state),
    activeId: state.admin.editedItem && state.admin.editedItem._id,
    forcedActiveId: null as any,
    expandedIds: state.admin.expandedIds
})

const mapDispatchToProps = {
    changeActive: actions.setEditedItem,
    changeExpandedIds: actions.setAdminExpandedIds,
    changeTreeFilter: actions.setAdminFilterText
}

const AdminTree = connect(mapStateToProps, mapDispatchToProps)(Tree)
export default AdminTree
