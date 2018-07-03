import { AnyAction } from "redux"
import * as _ from 'lodash'

import { IClientUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IUsersState {
    data: IClientUser[]
    isComplete: boolean
}

const initialState: IUsersState = {
    data: [],
    isComplete: false
}

const setUsers = (state: IUsersState, action: AnyAction, isComplete?: boolean) => {
    return updateObject(state, { data: action.payload, isComplete })
}

const addUser = (state: IUsersState, action: AnyAction) => {
    const newData = state.data.slice()
    newData.push(action.payload)
    return updateObject(state, { data: newData })
}

const updateUser = (state: IUsersState, action: AnyAction) => {
    const updatedUser = action.payload.user
    const data = state.data.slice()
    const userIndex = data.findIndex(user => user.id === updatedUser.id)
    data[userIndex] = { ...data[userIndex], ...updatedUser }
    return updateObject(state, { data: data })
}

const deleteUser = (state: IUsersState, action: AnyAction) => {
    const deletedUser = action.payload.user
    const data = _.differenceWith(state.data, [deletedUser], (a: any, b) => a.id === b.id)
    return updateObject(state, { data })
}

export const usersReducer = createReducer(initialState, {
    [actionTypes.FETCH_USERS_SUCCESS]: setUsers,
    [actionTypes.FETCH_ALL_USERS_SUCCESS]: (state, action) => setUsers(state, action, true),
    [actionTypes.ADD_USER]: addUser,
    [actionTypes.UPDATE_USER]: updateUser,
    [actionTypes.DELETE_USER]: deleteUser,
    [actionTypes.SET_USERS]: setUsers,
})
