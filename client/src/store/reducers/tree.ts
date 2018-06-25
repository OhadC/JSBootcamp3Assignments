import { actionTypes } from "../actions"
import { IClientGroup, IClientGroupObject } from "../../models"
import { updateObject, createReducer } from "../utility"
import { AnyAction } from "redux";

export interface ITreeState {
    activeGroupId: string
    allGroups: IClientGroupObject
    filterText: string
    filteredGroups: IClientGroupObject,
    shownGroups: IClientGroup[]
}

const initialState: ITreeState = {
    activeGroupId: "0",
    allGroups: {},      // only this!
    filterText: '',
    filteredGroups: {},
    shownGroups: []     // organized
}

const setGroups = (state: ITreeState, action: AnyAction): ITreeState => {
    const allGroups: IClientGroupObject = action.payload.groups
    const newValues = {
        allGroups,
        filteredGroups: allGroups
    }
    return updateObject(state, newValues)
}

const setShownGroups = (state: ITreeState, action: AnyAction): ITreeState => {
    return updateObject(state, { shownGroups: action.payload.shownGroups })
}

const setFilteredGroups = (state: ITreeState, action: AnyAction): ITreeState => {
    const newValues = {
        filterText: action.payload.filterText,
        filteredGroups: action.payload.filteredGroups,
    }
    return updateObject(state, newValues)
}

const setActiveGroupId = (state: ITreeState, action: AnyAction): ITreeState =>
    updateObject(state, { activeGroupId: action.payload.groupId })

const logout = (): ITreeState => initialState

export const treeReducer = createReducer(initialState, {
    [actionTypes.SET_GROUPS]: setGroups,
    [actionTypes.SET_SHOWN_GROUPS]: setShownGroups,
    [actionTypes.SET_FILTERED_GROUPS]: setFilteredGroups,
    [actionTypes.SET_ACTIVE_GROUP_ID]: setActiveGroupId,
    [actionTypes.LOGOUT]: logout
})
