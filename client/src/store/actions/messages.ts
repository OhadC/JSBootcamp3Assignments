import { AnyAction } from "redux"

import { actionTypes, apiRequest } from "."
import { IMessage } from "../../models"
import { store } from "../../store";

export const setMessages = (messages: IMessage[]): AnyAction => ({
    type: actionTypes.SET_MESSAGES,
    payload: { messages }
})

export const addMessage = (message: IMessage): AnyAction => ({
    type: actionTypes.ADD_MESSAGE,
    payload: { message }
})

export const fetchMessages = (groupId: string): AnyAction =>
    apiRequest({
        url: `/group/${groupId}/messages`,
        success: setMessages,
        label: 'fetchMessages'
    })

export const sendMessage = (content: string): AnyAction => {
    const { global: { activeGroup: { id: groupId } }, auth: { userId } }: any = store.getState()
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
