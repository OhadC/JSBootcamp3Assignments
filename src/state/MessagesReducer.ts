import axios, * as Axios from 'axios'

import { StateStore, IAppState } from "./StateStore"
import { IMessagesState, messagesInitialState } from './MessagesStore';
import { IMessage } from "../models/message";
import { getCancelObj, catchError } from '../common/axios';
import { IConversation } from '../models/conversation';

export const fetchMessages = (conversationId: string, callback?: Function) => {
    if (!StateStore.appState.auth.isAuthenticated) return
    StateStore.setState({ messages: messagesInitialState })
    axios.get('./mock-data/conversation.json', getCancelObj('fetchMessages'))
        .then((response: Axios.AxiosResponse<IConversation[]>) => {
            const conversations: IConversation[] = response.data    // TODO: generator
            const messages: IMessagesState = conversations[conversationId].messages
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
    StateStore.setState((prevState: IAppState) => {
        const newMessage: IMessage = {
            id: Math.random() + "",
            user: prevState.auth.user,
            content: messageContent,
            date: (new Date()).toISOString()
        }
        return {
            messages: {
                ...prevState.messages,
                [newMessage.id]: newMessage
            }
        }
    }, callback)
}

export const echoMessage = (messageContent: string) => {    // temporary function. no need for refactoring.
    StateStore.setState((prevState: IAppState) => {
        const newMessage: IMessage = {
            id: Math.random() + "",
            user: {
                "id": "2",
                "name": "user2",
                "password": "user2",
                "age": 2
            },
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
