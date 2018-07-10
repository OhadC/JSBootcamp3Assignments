import { AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IClientMessage } from "../../models"
import { store } from "../../store";

export const setMessages = (messages: IClientMessage[]): AnyAction => ({
    type: actionTypes.SET_MESSAGES,
    payload: { messages }
})

export const socketLoginSuccess = (): AnyAction => ({
    type: actionTypes.SOCKET_LOGIN_SUCCESS
})

export const addMessage = (message: IClientMessage): AnyAction => ({
    type: actionTypes.ADD_MESSAGE,
    payload: { message }
})

export const fetchMessages = (groupId: string): AnyAction =>
    apiRequest({
        url: `/group/${groupId}/messages`,
        label: 'fetchMessages'
    })

export const sendMessage = (content: string): AnyAction => {
    const { tree: { active: { _id: groupId } }, auth: { userId } }: any = store.getState()
    const message = {
        groupId,
        userId,
        content,
        date: (new Date()).toISOString(),
    }
    return {
        type: actionTypes.SEND_MESSAGE,
        payload: { message }
    }
}
