import { IUser } from ".";
import { IClientUser } from "./user";

export interface IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users?: IUser[]
}

export interface IServerGroup extends IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users: undefined
}

export interface IClientGroup extends IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users: IClientUser[]
}
