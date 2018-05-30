import axios, * as Axios from 'axios'

import * as AppStore from "./StateStore";
import { IMessagesState } from './MessagesStore';
import { IMessage } from "../models/message";
import { getCancelObj, catchError } from '../common/axios';

export const changeLocation = (type: string, id: string, callback?: Function) => {
    if (!AppStore.appState.auth.isAuthenticated) return
    axios.get('./mock-data/message.json', getCancelObj('changeLocation'))
        .then((data: Axios.AxiosResponse<IMessagesState>) => data.data)
        .then((messages: IMessagesState) => {
            
            AppStore.setState({ messages }, callback)
        })
        .catch(catchError)
}

export const addMessage = (messageContent: string, callback?: Function) => {
    if (!AppStore.appState.auth.isAuthenticated) return
    if (!messageContent.length) return
    AppStore.setState((prevState: AppStore.IAppState) => {
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

export const echoMessage = (messageContent: string) => {    // temporary function. no need for refactoring.
    AppStore.setState((prevState: AppStore.IAppState) => {
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
