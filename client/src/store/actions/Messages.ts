import { Dispatch } from "redux";
import axios from "axios"

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

export const fetchMessagesStart = () => ({
    type: actionTypes.FETCH_MESSAGES_START
})

export const fetchMessagesFail = (error: Error) => ({
    type: actionTypes.FETCH_MESSAGES_FAIL,
    payload: { error }
})

export const fetchMessages = (groupId: string) => (dispatch: Dispatch) => {
    dispatch(fetchMessagesStart())

    const url = `http://localhost:4000/group/${groupId}/messages`

    axios.get(url)
        .then(response => {
            dispatch(setMessages(response.data));
        })
        .catch(error => {
            dispatch(fetchMessagesFail(error.response.data.error));
        });
}

export const sendMessage = (content: string) => (dispatch: Dispatch, getState: Function) => {
    const { tree: { currentGroup: groupId }, auth: { user: { id: userId } } } = getState()
    const url = `http://localhost:4000//message`
    const message = {
        groupId,
        userId,
        content,
        date: (new Date()).toISOString(),
    }

    axios.post(url, message)
        .then(response => {
            dispatch(addMessage(response.data));
        })
        .catch(error => {
            dispatch(fetchMessagesFail(error.response.data.error));
        });
}
