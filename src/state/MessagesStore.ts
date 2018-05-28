import { AppStore } from "./StateStore";
import { IMessage } from "../models/message";

interface IMessagesState {
    [key: string]: IMessage
}

let messagesInitialState: IMessagesState = {
}

class MessagesReducer {
    changeLocation() { //TODO: newLocation: string
        fetch('./mock-data/messages.json')
            .then((res: Response) => res.json())
            .then((messages: IMessagesState) => {
                AppStore.setState({ messages })
            })
    }
}

export { IMessagesState, messagesInitialState, MessagesReducer }
