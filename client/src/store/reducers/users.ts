import { AnyAction } from "redux"

import { IClientUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IUsersState {
    data: IClientUser[]
}

const initialState: IUsersState = {
    data: []
}

const setUsers = (state: IUsersState, action: AnyAction) => {
    return updateObject(state, { data: action.payload })
}

const addUser = (state: IUsersState, action: AnyAction) => {
    const newData = state.data.slice()
    newData.push(action.payload)
    return updateObject(state, { data: newData })
}

export const usersReducer = createReducer(initialState, {
    [actionTypes.FETCH_USERS_SUCCESS]: setUsers,
    [actionTypes.ADD_USER]: addUser,
    [actionTypes.SET_USERS]: setUsers,
})
