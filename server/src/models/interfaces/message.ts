import { IUser } from ".";

export interface IMessage {
    id: string
    groupId: string
    userId: string
    user?: IUser
    content: string
    date: string
}
