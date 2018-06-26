import { AnyAction } from "redux"

import { actionTypes } from "."

export const socketLoginSuccess = (): AnyAction => ({
    type: actionTypes.SOCKET_LOGIN_SUCCESS
})
