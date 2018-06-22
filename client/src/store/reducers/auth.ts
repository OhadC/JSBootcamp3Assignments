import { AnyAction } from "redux"

import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IAuthState {
    userId: string | null,
    token: string | null
}

const initialState: IAuthState = {
    userId: null,
    token: null
}

const loginSuccess = (state: IAuthState, action: AnyAction): IAuthState => {
    const newValues = {
        userId: action.payload.user.id,
        token: action.payload.token
    }
    return updateObject(state, newValues)
}

const logout = (state: IAuthState, action: AnyAction): IAuthState => initialState

export const authReducer = createReducer(initialState, {
    [actionTypes.LOGIN_SUCCESS]: loginSuccess,
    [actionTypes.LOGOUT]: logout
})
