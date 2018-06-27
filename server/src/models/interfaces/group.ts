import { IUser } from ".";
import { IClientUser } from "./user";

export interface IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users?: IUser[]
    isPrivate: boolean
}

export interface IServerGroup extends IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users: undefined
    isPrivate: boolean
}

export interface IClientGroup extends IGroup {
    parentId?: string
    id: string
    name?: string
    userIds?: string[]
    users: IClientUser[]
    isPrivate: boolean
}
