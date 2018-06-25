import { IUser } from ".";
import { IClientUser } from "./user";

export interface IGroup {
    id: string
    name?: string
    userIds?: string[]
    users?: IUser[]
    groupIds?: string[]
    isRoot: boolean
    isPrivate: boolean
}

export interface IServerGroup extends IGroup {
    id: string
    name?: string
    userIds?: string[]
    users: undefined
    groupIds?: string[]
    isRoot: boolean
    isPrivate: boolean
}

export interface IClientGroup extends IGroup {
    id: string
    name?: string
    userIds?: string[]
    users: IClientUser[]
    groupIds?: string[]
    isRoot: boolean
    isPrivate: boolean,

    isExpanded?: boolean,
    level?: number
}

export interface IClientGroupObject {
    [key: string]: IClientGroup
}
