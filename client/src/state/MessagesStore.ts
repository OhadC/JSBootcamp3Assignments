import { IMessage } from "../models/message";

export interface IMessagesState extends Array<IMessage> {
}

export const messagesInitialState: IMessagesState = []
