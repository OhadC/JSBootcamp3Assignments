import { AnyAction } from "redux"
import { apiRequest, actionTypes } from ".";

export const login = (name: string, password: string) =>
    apiRequest({
        url: '/auth/login',
        method: 'post',
        data: { name, password },
        label: 'login'
    })

export const logout = (): AnyAction => ({
    type: actionTypes.LOGOUT,
})
