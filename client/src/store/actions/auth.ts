import { AnyAction } from "redux"

import { actionTypes } from "."

export const loginFromLocalstorage = () => ({
    type: actionTypes.LOGIN_FROM_LOCALSTORAGE
})

export const login = (payload?: any, status?: string) => ({
    type: actionTypes.LOGIN,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const loginRequest = (name: string, password: string) => login({ name, password }, actionTypes.REQUEST)

export const logout = (): AnyAction => ({
    type: actionTypes.LOGOUT,
})

export const checkAuthTimeout = (expiresIn: number) => ({
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    payload: { expiresIn }
})
