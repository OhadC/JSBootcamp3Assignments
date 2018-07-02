import { connect } from 'react-redux'

import { Tree } from "../../Tree/Tree"
import { IAppState } from "../../../store/reducers"
import { adminTreeSelector } from "../../../store/selectors"
import * as actions from "../../../store/actions"

const mapStateToProps = (state: IAppState) => ({
    tree: adminTreeSelector(state),
    activeId: state.admin.editedItem && state.admin.editedItem.id,
    expandedIds: state.admin.expandedIds
})

const mapDispatchToProps = {
    changeActive: actions.setEditedItem,
    changeExpandedIds: actions.setAdminExpandedIds,
    changeTreeFilter: actions.setAdminFilterText
}

const AdminTree = connect(mapStateToProps, mapDispatchToProps)(Tree)
export default AdminTree
