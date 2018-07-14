import { AnyAction } from "redux"

import { actionTypes } from "."
import { IClientMessage } from "../../models"

export const fetchMessages = (payload?: any, status?: string) => ({
    type: actionTypes.FETCH_MESSAGES,
    status: actionTypes.getStatus(payload, status),
    payload
})
export const fetchMessagesRequest = (groupId: string) => fetchMessages({ groupId }, actionTypes.REQUEST)

export const socketLoginSuccess = (): AnyAction => ({
    type: actionTypes.SOCKET_LOGIN_SUCCESS
})

export const addMessage = (message: IClientMessage): AnyAction => ({
    type: actionTypes.ADD_MESSAGE,
    payload: { message }
})

export const sendMessage = (content: string): AnyAction => ({
    type: actionTypes.SEND_MESSAGE,
    payload: { content }
})
