import { IUser } from "./user";

export interface IMessage {
    id: string
    user: IUser  // TODO: should be userId
    content: string
    date: string
}
