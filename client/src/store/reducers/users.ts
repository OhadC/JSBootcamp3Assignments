import { AnyAction } from "redux"

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
    const users = state.data.slice()
    const userIndex = users.findIndex(user => user.id === updatedUser.id)
    users[userIndex] = { ...users[userIndex], ...updatedUser }
    return updateObject(state, { data: users })
}

export const usersReducer = createReducer(initialState, {
    [actionTypes.FETCH_USERS_SUCCESS]: setUsers,
    [actionTypes.FETCH_ALL_USERS_SUCCESS]: (state, action) => setUsers(state, action, true),
    [actionTypes.ADD_USER]: addUser,
    [actionTypes.UPDATE_USER]: updateUser,
    [actionTypes.SET_USERS]: setUsers,
})
