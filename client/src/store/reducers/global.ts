import { AnyAction } from "redux"

import { IClientGroup, IClientUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IGlobalState {
    activeGroup: IClientGroup | null
    user: IClientUser | null
}

const initialState: IGlobalState = {
    activeGroup: null,
    user: null
}

const setActiveGroup = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { activeGroup: action.payload.group })

    const loginSuccess = (state: IGlobalState, action: AnyAction): IGlobalState => {
        return updateObject(state, {user: action.payload.user})
    }

const logout = (): IGlobalState => initialState

export const globalReducer = createReducer(initialState, {
    [actionTypes.SET_ACTIVE_GROUP]: setActiveGroup,
    [actionTypes.LOGIN_SUCCESS]: loginSuccess,
    [actionTypes.LOGOUT]: logout
})
