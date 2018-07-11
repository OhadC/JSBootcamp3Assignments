import { AnyAction } from "redux"
import { actionTypes } from ".";
import { getStatus } from "./api";

export const loginRequest = (name: string, password: string) => ({
    type: actionTypes.LOGIN,
    status: actionTypes.REQUEST,
    payload: { name, password }
})

export const login = (payload: any, status?: string) => ({
    type: actionTypes.LOGIN,
    status: getStatus(payload, status),
    payload
})

export const logout = (): AnyAction => ({
    type: actionTypes.LOGOUT,
})
