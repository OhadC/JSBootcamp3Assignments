import { Dispatch } from "redux"

import { actionTypes } from "."
import { IMessage } from "../../models"

export const setMessages = (messages: IMessage[]) => ({
    type: actionTypes.SET_MESSAGES,
    payload: { messages }
})

export const addMessage = (message: IMessage) => ({
    type: actionTypes.ADD_MESSAGE,
    payload: { message }
})

export const fetchMessages = (groupId: string) => ({
    type: actionTypes.API,
    payload: {
        url: `/group/${groupId}/messages`,
        success: setMessages,
        label: 'fetchMessages'
    }
})

export const sendMessage = (content: string) => (dispatch: Dispatch, getState: Function) => {
    const { global: { activeGroup: { id: groupId } }, auth: { userId } } = getState()
    const url = `/message`
    const message = {
        groupId,
        userId,
        content,
        date: (new Date()).toISOString(),
    }
    dispatch({
        type: actionTypes.API,
        payload: {
            method: 'post',
            url,
            data: message,
            success: addMessage
        }
    })
}
