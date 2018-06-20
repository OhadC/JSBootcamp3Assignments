
import { actionTypes } from "../actions"

export interface IAuthState {
    userId: string | null,
    token: string | null
}

const initialState: IAuthState = {
    userId: null,
    token: null
}

const loginSuccess = (state: IAuthState, action: any): IAuthState => ({
    ...state,
    userId: action.payload.userId,
    token: action.payload.token
})

const logout = (state: IAuthState, action: any): IAuthState => initialState

export const authReducer = (state: IAuthState = initialState, action: any): IAuthState => {
    switch (action.type) {
        case (actionTypes.LOGIN_SUCCESS): return loginSuccess(state, action)
        case (actionTypes.LOGOUT): return logout(state, action)
        default: return state
    }
}
