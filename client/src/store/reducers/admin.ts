import { actionTypes } from "../actions"

import { createReducer } from "../utility"
import { ITreeItem, IClientGroup, IClientUser } from "../../models";

export interface IAdminlState {
    editMode: 'groups' | 'users'
    active: IClientGroup | IClientUser | null
    tree: ITreeItem[]
    filteredTree: ITreeItem[]
    expandedIds: string[]
}

const initialState: IAdminlState = {
    editMode: 'groups',
    active: null,
    tree: [],
    filteredTree: [],
    expandedIds: [],
}

const logout = (): IAdminlState => initialState

export const adminReducer = createReducer(initialState, {
    [actionTypes.LOGOUT]: logout
})
