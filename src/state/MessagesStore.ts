import { AppStore, IAppState, appState } from "./StateStore";
import { IMessage } from "../models/message";

interface IMessagesState {
    [key: string]: IMessage
}

let messagesInitialState: IMessagesState = {
}

class MessagesReducer {
    static changeLocation(callback?: Function) { //TODO: newLocation: string
        if(!appState.auth.isAuthenticated) return
        fetch('./mock-data/message.json')
            .then((res: Response) => res.json())
            .then((messages: IMessagesState) => {
                AppStore.setState({ messages }, callback)
            })
    }

    static addMessage(messageContent: string, callback?: Function) {
        if(!appState.auth.isAuthenticated) return
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
