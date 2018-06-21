import { Dispatch, AnyAction } from "redux"
import { actionTypes } from ".";

export const loginStart = (): AnyAction => ({
    type: actionTypes.LOGIN_START
})

export const loginSuccess = (userId: string, token: string): AnyAction => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: { userId, token }
})

export const logout = (): AnyAction => ({
    type: actionTypes.LOGOUT,
})

export const login = (username: string, password: string) => (dispatch: Dispatch) => {
    dispatch(loginStart())
    dispatch(loginSuccess("0", "TOKEN"))
}
