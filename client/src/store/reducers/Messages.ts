import { actionTypes } from "../actions"
import { IMessage } from "../../models"

interface IMessagesState {
    messages: IMessage[]
}

const initialState: IMessagesState = {
    messages: []
}

const setMessage = (state: IMessagesState, action: any): IMessagesState => ({
    ...state,
    messages: action.payload.messages
})

const addMessage = (state: IMessagesState, action: any): IMessagesState => ({
    ...state,
    messages: [
        ...state.messages,
        action.payload.message
    ]
})

const fetchMessageStart = (state: IMessagesState): IMessagesState => ({
    ...state,
    messages: []
})


export const messagesReducer = (state: IMessagesState = initialState, action: any): IMessagesState => {
    switch (action.type) {
        case (actionTypes.SET_MESSAGES): return setMessage(state, action)
        case (actionTypes.ADD_MESSAGE): return addMessage(state, action)
        case (actionTypes.FETCH_MESSAGES_START): return fetchMessageStart(state)
        default: return state
    }
}
