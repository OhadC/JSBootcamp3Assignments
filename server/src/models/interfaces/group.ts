import { IUser } from ".";

export interface IGroup {
    id: string
    name?: string
    userIds?: string[]
    users?: IUser[]
    groupIds?: string[]
    isRoot?: boolean
    isPrivate: boolean
}
