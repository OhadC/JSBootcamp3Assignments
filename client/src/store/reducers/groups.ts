import { AnyAction } from "redux"

import { IClientGroup } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IGroupsState {
    data: IClientGroup[]
    isComplete: boolean
}

const initialState: IGroupsState = {
    data: [],
    isComplete: false
}

const setGroups = (state: IGroupsState, action: AnyAction, isComplete?: boolean) => {
    return updateObject(state, { data: action.payload, isComplete })
}

const addGroup = (state: IGroupsState, action: AnyAction) => {
    const newData = state.data.slice()
    newData.push(action.payload)
    return updateObject(state, { data: newData })
}

const updateGroup = (state: IGroupsState, action: AnyAction) => {
    const updatedGroup = action.payload.group
    const groups = state.data.slice()
    const groupIndex = groups.findIndex(group => group.id === updatedGroup.id)
    groups[groupIndex] = { ...groups[groupIndex], ...updatedGroup }
    return updateObject(state, { data: groups })
}

export const groupsReducer = createReducer(initialState, {
    [actionTypes.FETCH_GROUPS_SUCCESS]: setGroups,
    [actionTypes.FETCH_ALL_GROUPS_SUCCESS]: (state, action) => setGroups(state, action, true),
    [actionTypes.ADD_GROUP]: addGroup,
    [actionTypes.UPDATE_GROUP]: updateGroup,
    [actionTypes.SET_GROUPS]: setGroups,
})
