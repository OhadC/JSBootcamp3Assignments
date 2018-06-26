import { AnyAction } from "redux"

import { IClientUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IGlobalState {
    user: IClientUser | null
}

const initialState: IGlobalState = {
    user: null
}

const loginSuccess = (state: IGlobalState, action: AnyAction): IGlobalState => {
    return updateObject(state, { user: action.payload.user })
}

const logout = (): IGlobalState => initialState

export const globalReducer = createReducer(initialState, {
    [actionTypes.LOGIN_SUCCESS]: loginSuccess,
    [actionTypes.LOGOUT]: logout
})
