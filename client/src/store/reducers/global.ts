import { AnyAction } from "redux"

import { IClientUser } from "../../models"
import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"

export interface IGlobalState {
    user: IClientUser | null
    loading: number
}

const initialState: IGlobalState = {
    user: null,
    loading: 0
}

const loginSuccess = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { user: action.payload.user })

const startLoading = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { loading: state.loading + 1 })

const finishLoading = (state: IGlobalState, action: AnyAction): IGlobalState =>
    updateObject(state, { loading: state.loading - 1 })

const logout = (): IGlobalState => initialState

export const globalReducer = createReducer(initialState, {
    [actionTypes.LOGIN_SUCCESS]: loginSuccess,
    [actionTypes.START_LOADING]: startLoading,
    [actionTypes.FINISH_LOADING]: finishLoading,
    [actionTypes.LOGOUT]: logout
})
