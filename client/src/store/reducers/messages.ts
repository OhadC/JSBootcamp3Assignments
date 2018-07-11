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

const fetchMessage = (state: IMessagesState, action: AnyAction): IMessagesState => {
    if (action.status === actionTypes.SUCCESS) {
        return updateObject(state, { messages: action.payload })
    }
    return state
}
const addMessage = (state: IMessagesState, action: AnyAction): IMessagesState => {
    const newMessages = [
        ...state.messages,
        action.payload.message
    ]
    return updateObject(state, { messages: newMessages })
}

const logout = (): IMessagesState => initialState

export const messagesReducer = createReducer(initialState, {
    [actionTypes.FETCH_MESSAGES]: fetchMessage,
    [actionTypes.ADD_MESSAGE]: addMessage,
    [actionTypes.LOGOUT]: logout
})
