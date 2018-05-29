import axios, * as Axios from 'axios'

import { AppStore, IAppState, appState } from "./StateStore";
import { IMessage } from "../models/message";
import { getCancelObj, catchError } from '../common/axios';

interface IMessagesState {
    [key: string]: IMessage
}

let messagesInitialState: IMessagesState = {
}



class MessagesReducer {
    static changeLocation(callback?: Function) { //TODO: newLocation: string
        if (!appState.auth.isAuthenticated) return
        axios('./mock-data/message.json', getCancelObj('changeLocation'))
            .then((data: Axios.AxiosResponse<IMessagesState>) => data.data)
            .then((messages: IMessagesState) => {
                AppStore.setState({ messages }, callback)
            })
            .catch(catchError)
    }

    static addMessage(messageContent: string, callback?: Function) {
        if (!appState.auth.isAuthenticated) return
        if (!messageContent.length) return
        AppStore.setState((prevState: IAppState) => {
            const newMessage: IMessage = {
                id: Math.random() + "",
                groupId: '1',
                userId: '1',
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

    static echoMessage(messageContent: string) {    // temporary function. no need for refactoring.
        AppStore.setState((prevState: IAppState) => {
            const newMessage: IMessage = {
                id: Math.random() + "",
                groupId: '1',
                userId: '2',
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
}

export { IMessagesState, messagesInitialState, MessagesReducer }
