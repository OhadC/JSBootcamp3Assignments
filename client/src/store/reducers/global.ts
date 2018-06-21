import { AnyAction } from "redux"

import { IGroup, IUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IGlobalState {
    activeGroup: IGroup | null
    user: IUser | null
}

const initialState: IGlobalState = {
    activeGroup: null,
    user: null
}

const setActiveGroup = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { activeGroup: action.payload.group })

const setUser = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { user: action.payload.user })

const logout = (): IGlobalState => initialState

export const globalReducer = createReducer(initialState, {
    [actionTypes.SET_ACTIVE_GROUP]: setActiveGroup,
    [actionTypes.SET_USER]: setUser,
    [actionTypes.LOGOUT]: logout
})
