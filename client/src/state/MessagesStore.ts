import { IMessage } from "../models/message";

export interface IMessagesState {
    [key: string]: IMessage
}

export const  messagesInitialState: IMessagesState = {
}
