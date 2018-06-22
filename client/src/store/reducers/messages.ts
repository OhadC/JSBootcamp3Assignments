import { AnyAction } from "redux"

import { actionTypes } from "../actions"
import { updateObject, createReducer } from "../utility"
import { IClientMessage } from "../../models"

export interface IMessagesState {
    messages: IClientMessage[]
}

const initialState: IMessagesState = {
    messages: []
}

const setMessage = (state: IMessagesState, action: AnyAction): IMessagesState =>
    updateObject(state, { messages: action.payload })

const addMessage = (state: IMessagesState, action: AnyAction): IMessagesState => {
    const newMessages = [
        ...state.messages,
        action.payload.message
    ]
    return updateObject(state, { messages: newMessages })
}

const fetchMessageStart = (state: IMessagesState): IMessagesState =>
    updateObject(state, { messages: [] })

const logout = (): IMessagesState => initialState

export const messagesReducer = createReducer(initialState, {
    [actionTypes.FETCH_MESSAGES_SUCCESS]: setMessage,
    [actionTypes.ADD_MESSAGE]: addMessage,
    [actionTypes.FETCH_MESSAGES_START]: fetchMessageStart,
    [actionTypes.LOGOUT]: logout
})
