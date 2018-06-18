export interface IGroup {
    id: string
    name?: string | null
    parentId?: string | null
    userIds: string[]
    groupIds: string[]
    isPrivate: boolean
}
