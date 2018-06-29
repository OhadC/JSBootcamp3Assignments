export interface IConversation{
    id: string
    ofType: "group" | "user"
    parentId: string[]
}

export interface IServerConversation{
    id: string
    ofType: "group" | "user"
    parentId: string[]
}

export interface IClientConversation{
    id: string
    ofType: "group" | "user"
    parentId: string[]
}
