import { actionTypes } from "../actions"

import { createReducer, updateObject } from "../utility"
import { IClientUser, IClientGroup } from "../../models"
import { AnyAction } from "redux";

export interface IAdminState {
    editMode: 'groups' | 'users'
    editedItem: IClientUser | IClientGroup | null
    filterText: string
    expandedIds: string[]
}

const initialState: IAdminState = {
    editMode: 'groups',
    editedItem: null,
    filterText: '',
    expandedIds: []
}

const setEditMode = (state: IAdminState, action: AnyAction): IAdminState => {
    if (state.editMode === action.payload.editMode) return state
    return updateObject(state, {
        editMode: action.payload.editMode,
        editedItem: null,
        expandedIds: [],
        filterText: ''
    })
}

const setEditedItem = (state: IAdminState, action: AnyAction): IAdminState =>
    updateObject(state, { editedItem: action.payload.editedItem })

const setExpandedIds = (state: IAdminState, action: any): IAdminState =>
    updateObject(state, { expandedIds: action.payload.expandedIds })

const setFilterText = (state: IAdminState, action: any): IAdminState =>
    updateObject(state, { filterText: action.payload.filterText })

const logout = (): IAdminState => initialState

export const adminReducer = createReducer(initialState, {
    [actionTypes.SET_ADMIN_EDIT_MODE]: setEditMode,
    [actionTypes.SET_EDITED_ITEM]: setEditedItem,
    [actionTypes.SET_ADMIN_EXPANDED_IDS]: setExpandedIds,
    [actionTypes.SET_ADMIN_FILTER_TEXT]: setFilterText,
    [actionTypes.LOGOUT]: logout
})
