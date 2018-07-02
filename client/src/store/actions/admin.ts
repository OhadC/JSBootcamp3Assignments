import * as actions from '../../store/actions'
import { IClientUser, IClientGroup } from "../../models"

export const setAdminEditMode = (editMode: 'groups' | "users") => ({
    type: actions.actionTypes.SET_ADMIN_EDIT_MODE,
    payload: { editMode }
})

export const setAdminExpandedIds = (expandedIds: string[]) => ({
    type: actions.actionTypes.SET_ADMIN_EXPANDED_IDS,
    payload: { expandedIds }
})

export const setEditedItem = (editedItem: IClientUser | IClientGroup) => ({
    type: actions.actionTypes.SET_EDITED_ITEM,
    payload: { editedItem }
})

export const setAdminFilterText = (filterText: IClientUser | IClientGroup) => ({
    type: actions.actionTypes.SET_ADMIN_FILTER_TEXT,
    payload: { filterText }
})
