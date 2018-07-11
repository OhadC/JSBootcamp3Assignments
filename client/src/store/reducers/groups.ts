import { AnyAction } from "redux"
import * as _ from 'lodash'

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
    if (action.status !== actionTypes.SUCCESS) return state

    let data: IClientGroup[] = action.payload
    if (isComplete) {
        const privateGroups = state.data.filter(group => group.isPrivate)
        data = data.concat(privateGroups)
    }
    return updateObject(state, { data, isComplete })
}

const addGroup = (state: IGroupsState, action: AnyAction) => {
    if (action.status !== actionTypes.SUCCESS) return state

    const newData = state.data.slice()
    newData.push(action.payload)
    return updateObject(state, { data: newData })
}

const updateGroup = (state: IGroupsState, action: AnyAction) => {
    if (action.status !== actionTypes.SUCCESS) return state

    const updatedGroup = action.payload
    const data = state.data.slice()
    const groupIndex = data.findIndex(group => group._id === updatedGroup._id)
    data[groupIndex] = { ...data[groupIndex], ...updatedGroup }
    return updateObject(state, { data })
}

const deleteGroup = (state: IGroupsState, action: AnyAction) => {
    if (action.status !== actionTypes.SUCCESS) return state

    const deletedGroup = action.payload.group
    const dataMap = _.mapKeys(state.data, '_id')
    deleteGroupRecursively(deletedGroup)
    const data = _.values(dataMap)
    return updateObject(state, { data })

    function deleteGroupRecursively(groupToDelete: IClientGroup) {
        delete dataMap[groupToDelete._id]
        _.forEach(dataMap, group => {
            if (group && group.parentId === groupToDelete._id) {
                deleteGroupRecursively(group)
            }
        })
    }
}

const deleteUser = (state: IGroupsState, action: AnyAction) => {
    const deletedUser = action.payload.user
    const data: IClientGroup[] = state.data.slice()

    for (let i = data.length - 1; i >= 0; i--) {
        const group = data[i]
        if (group.userIds && _.includes(group.userIds, deletedUser._id)) {
            if (group.isPrivate) {
                data.splice(i, 1)
            } else {
                const newGroup = Object.assign({}, group)
                newGroup.userIds = _.difference(newGroup.userIds, [deletedUser._id])
                newGroup.users = _.differenceWith(newGroup.users, [deletedUser], (a: any, b) => a._id === b._id)
                data[i] = newGroup
            }
        }
    }

    return updateObject(state, { data })
}

export const groupsReducer = createReducer(initialState, {
    [actionTypes.FETCH_GROUPS]: setGroups,
    [actionTypes.FETCH_ALL_GROUPS]: (state, action) => setGroups(state, action, true),
    [actionTypes.ADD_GROUP]: addGroup,
    [actionTypes.UPDATE_GROUP]: updateGroup,
    [actionTypes.DELETE_GROUP]: deleteGroup,
    [actionTypes.DELETE_USER]: deleteUser,
})
