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

const login = (state: IAuthState, action: AnyAction): IAuthState => {
    if (action.status !== actionTypes.SUCCESS) return state
    
    const newValues = {
        userId: action.payload.user._id, // TODO: need to be user
        token: action.payload.token
    }
    return updateObject(state, newValues)
}

const logout = (state: IAuthState, action: AnyAction): IAuthState => initialState

export const authReducer = createReducer(initialState, {
    [actionTypes.LOGIN]: login,
    [actionTypes.LOGOUT]: logout
})
