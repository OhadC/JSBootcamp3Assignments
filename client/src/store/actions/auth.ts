import { AnyAction } from "redux"
import { actionTypes } from "."

export const login = (payload?: any, status?: string) => ({
    type: actionTypes.LOGIN,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const loginRequest = (name: string, password: string) => login({ name, password }, actionTypes.REQUEST)

export const logout = (): AnyAction => ({
    type: actionTypes.LOGOUT,
})
