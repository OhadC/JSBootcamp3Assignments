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

export const usersReducer = createReducer(initialState, {
    [actionTypes.FETCH_USERS_SUCCESS]: setUsers,
    [actionTypes.FETCH_ALL_USERS_SUCCESS]: (state, action) => setUsers(state, action, true),
    [actionTypes.ADD_USER]: addUser,
    [actionTypes.SET_USERS]: setUsers,
})
