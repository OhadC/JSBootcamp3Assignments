import { IUser } from "."
import { IClientUser } from "./user";

export interface IMessage {
    id: string
    groupId: string
    userId: string
    user?: IUser
    content: string
    date: string
}

export interface IServerMessage extends IMessage{
    id: string
    groupId: string
    userId: string
    user: undefined
    content: string
    date: string
}

export interface IClientMessage extends IMessage{
    id: string
    groupId: string
    userId: string
    user: IClientUser
    content: string
    date: string
}
