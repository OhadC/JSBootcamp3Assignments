import { actionTypes } from "../actions"
import { IClientGroup, IClientGroupObject } from "../../models"
import { updateObject, createReducer } from "../utility"

export interface ITreeState {
    activeGroup: IClientGroup | null
    allGroups: IClientGroupObject
    filterText: string
    filteredGroups: IClientGroupObject,
    shownGroups: IClientGroup[]
}

const initialState: ITreeState = {
    activeGroup: null,
    allGroups: {},
    filterText: '',
    filteredGroups: {},
    shownGroups: []     // organized
}

const setGroups = (state: ITreeState, action: any): ITreeState => {
    const allGroups: IClientGroupObject = action.payload.groups
    const newValues = {
        allGroups,
        filteredGroups: allGroups
    }
    return updateObject(state, newValues)
}

const setFilteredGroups = (state: ITreeState, action: any): ITreeState => {
    const newValues = {
        filterText: action.payload.filterText,
        filteredGroups: action.payload.filteredGroups,
    }
    return updateObject(state, newValues)
}

const logout = (): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_GROUPS]: setGroups,
    [actionTypes.SET_FILTERED_GROUPS]: setFilteredGroups,
    [actionTypes.LOGOUT]: logout
})
