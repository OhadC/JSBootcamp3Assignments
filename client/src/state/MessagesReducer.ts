import axios, * as Axios from 'axios'

import { StateStore, IAppState } from "./StateStore"
import { IMessagesState, messagesInitialState } from './MessagesStore'
import { IMessage } from "../models/message"
import { getCancelObj, catchError } from '../common/axios'

export const fetchMessages = (groupId: string, callback?: Function) => {
    if (!StateStore.appState.auth.isAuthenticated) return
    StateStore.setState({ messages: messagesInitialState })
    axios.get(`http://localhost:4000/group/${groupId}/messages`, getCancelObj('fetchMessages'))
        .then((response: Axios.AxiosResponse<IMessage[]>) => {
            const messages: IMessagesState = response.data
            StateStore.setState({ messages }, callback)
        })
        .catch(catchError)
        .catch((error: any) => {
            if (error.toString() === "TypeError: Cannot read property 'messages' of undefined") {
                StateStore.setState({ messages: messagesInitialState })
            } else {
                console.log(error)
            }
        })
}

export const addMessage = (messageContent: string, callback?: Function) => {
    if (!StateStore.appState.auth.isAuthenticated) return
    if (!messageContent.length) return

    const message = {
        groupId: "StateStore.appState.tree.activeItem.groupId",
        userId: StateStore.appState.auth.user.id,
        content: messageContent,
        date: (new Date()).toISOString(),
    }

    axios.post(`http://localhost:4000/message`, message)
        .then((response: Axios.AxiosResponse<IMessage>) => {
            StateStore.setState((prevState: IAppState) => {
                const newMessage = response.data
                return {
                    messages: {
                        ...prevState.messages,
                        [newMessage.id]: newMessage
                    }
                }
            }, callback)
        })
}

export const echoMessage = (messageContent: string) => {    // temporary function. no need for refactoring.
    StateStore.setState((prevState: IAppState) => {
        const newMessage: IMessage = {
            id: Math.random() + "",
            groupId: "prevState.tree.activeItem.groupId",
            userId: "string",
            content: messageContent,
            date: (new Date()).toISOString()
        }
        return {
            messages: {
                ...prevState.messages,
                [newMessage.id]: newMessage
            }
        }
    })
}
